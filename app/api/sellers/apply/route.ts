import { NextResponse, type NextRequest } from 'next/server'
import { sellerApplicationSchema } from '@/lib/validation'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sendMail } from '@/lib/mail'
import { saveRecord } from '@/lib/store'

export async function POST(request: NextRequest) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = sellerApplicationSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const captcha = await verifyRecaptcha(parsed.data.captchaToken, 'seller_application', request)

  if (!captcha.success) {
    return NextResponse.json(
      {
        error: 'We could not verify this request. Please complete the challenge and try again.',
        requiresChallenge: true,
      },
      { status: 403 }
    )
  }

  const applicationId = `APP-${Date.now().toString().slice(-6)}`

  await saveRecord('application', applicationId, {
    id: applicationId,
    createdAt: new Date().toISOString(),
    status: 'Received',
    ...parsed.data,
    captchaToken: undefined,
  })

  await sendMail({
    to: parsed.data.email,
    subject: `We received your Kezia Craft application (${applicationId})`,
    text: `Karibu ${parsed.data.name},\n\nThank you for applying to sell on Kezia Craft. Your reference is ${applicationId}.\n\nWhat happens next:\n1. Our team reviews your craft and photos within 3 working days.\n2. We call or WhatsApp you on ${parsed.data.phone} to talk through pricing and packaging.\n3. Your studio profile goes live and you can start listing products with zero listing fees.\n\nCraft: ${parsed.data.craftType}\nCounty: ${parsed.data.county}\n\nAsante sana for the work you make,\nThe Kezia Craft team`,
  })

  await sendMail({
    to: process.env.SMTP_FROM ?? 'sellers@keziacraft.co.ke',
    subject: `Seller application ${applicationId} from ${parsed.data.name}`,
    text: `New artisan application.\n\nName: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\nCraft: ${parsed.data.craftType}\nCounty: ${parsed.data.county}\n\nBio:\n${parsed.data.bio}\n\nSample product:\n${parsed.data.sampleProduct}`,
  })

  return NextResponse.json({
    applicationId,
    message: 'Application received. We will be in touch within three working days.',
  })
}
