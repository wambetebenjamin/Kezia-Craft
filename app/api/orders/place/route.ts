import { NextResponse, type NextRequest } from 'next/server'
import { orderSchema } from '@/lib/validation'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sendMail } from '@/lib/mail'
import { saveRecord } from '@/lib/store'
import { products } from '@/lib/data'
import { formatKES, SHIPPING_ESTIMATE, FREE_SHIPPING_THRESHOLD } from '@/lib/site'

export async function POST(request: NextRequest) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = orderSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please check the highlighted fields.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    )
  }

  const captcha = await verifyRecaptcha(parsed.data.captchaToken, 'place_order', request)

  if (!captcha.success) {
    return NextResponse.json(
      {
        error: 'We could not verify this request. Please complete the challenge and try again.',
        requiresChallenge: true,
      },
      { status: 403 }
    )
  }

  // Prices are recomputed from the catalogue so the client cannot change them.
  const lines = parsed.data.items.map((item) => {
    const catalogue = products.find((product) => product.id === item.id)
    const unitPrice = catalogue?.price ?? item.price
    return {
      id: item.id,
      name: catalogue?.name ?? item.name,
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
    }
  })

  const subtotal = lines.reduce((total, line) => total + line.lineTotal, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_ESTIMATE
  const total = subtotal + shipping
  const orderId = `KC-${Date.now().toString().slice(-6)}`

  const order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    status: 'Pending' as const,
    customer: {
      name: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      address: parsed.data.address,
      county: parsed.data.county,
      notes: parsed.data.notes,
    },
    paymentMethod: parsed.data.paymentMethod,
    lines,
    subtotal,
    shipping,
    total,
    currency: 'KES',
  }

  await saveRecord('order', orderId, order)

  const paymentLabel = parsed.data.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Card'

  await sendMail({
    to: parsed.data.email,
    subject: `Your Kezia Craft order ${orderId} is confirmed`,
    text: `Karibu ${parsed.data.fullName},\n\nThank you for supporting East African makers. We have received order ${orderId}.\n\n${lines
      .map((line) => `${line.quantity} x ${line.name} at ${formatKES(line.unitPrice)}`)
      .join('\n')}\n\nSubtotal: ${formatKES(subtotal)}\nDelivery: ${shipping === 0 ? 'Free' : formatKES(shipping)}\nTotal: ${formatKES(total)}\nPayment: ${paymentLabel}\n\nDelivering to: ${parsed.data.address}, ${parsed.data.county}\n\nWe will message you on WhatsApp when your parcel leaves the workshop.\n\nAsante sana,\nKezia Craft`,
    html: `<h2 style="font-family:sans-serif">Order ${orderId} confirmed</h2>
      <p style="font-family:sans-serif">Karibu ${parsed.data.fullName}, thank you for supporting East African makers.</p>
      <ul style="font-family:sans-serif">${lines
        .map((line) => `<li>${line.quantity} x ${line.name} at ${formatKES(line.unitPrice)}</li>`)
        .join('')}</ul>
      <p style="font-family:sans-serif">Subtotal: ${formatKES(subtotal)}<br />Delivery: ${
        shipping === 0 ? 'Free' : formatKES(shipping)
      }<br /><strong>Total: ${formatKES(total)}</strong><br />Payment: ${paymentLabel}</p>
      <p style="font-family:sans-serif">Delivering to ${parsed.data.address}, ${parsed.data.county}.</p>
      <p style="font-family:sans-serif">Asante sana,<br />Kezia Craft</p>`,
  })

  await sendMail({
    to: process.env.SMTP_FROM ?? 'orders@keziacraft.co.ke',
    subject: `New order ${orderId} for ${formatKES(total)}`,
    text: `New order from ${parsed.data.fullName} (${parsed.data.email}, ${parsed.data.phone}).\nCounty: ${parsed.data.county}\nPayment: ${paymentLabel}\nItems: ${lines
      .map((line) => `${line.quantity} x ${line.name}`)
      .join(', ')}\nTotal: ${formatKES(total)}`,
  })

  return NextResponse.json({
    order: { id: orderId, total, subtotal, shipping, status: order.status },
    message: 'Order received. A confirmation email is on its way.',
  })
}
