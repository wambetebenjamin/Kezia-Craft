import { NextResponse, type NextRequest } from 'next/server'
import { enquirySchema } from '@/lib/validation'
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

  const parsed = enquirySchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const captcha = await verifyRecaptcha(parsed.data.captchaToken, 'send_enquiry', request)

  if (!captcha.success) {
    return NextResponse.json(
      {
        error: 'We could not verify this request. Please complete the challenge and try again.',
        requiresChallenge: true,
      },
      { status: 403 }
    )
  }

  const enquiryId = `ENQ-${Date.now().toString().slice(-6)}`

  await saveRecord('enquiry', enquiryId, {
    id: enquiryId,
    createdAt: new Date().toISOString(),
    ...parsed.data,
    captchaToken: undefined,
  })

  await sendMail({
    to: process.env.SMTP_FROM ?? 'hello@keziacraft.co.ke',
    subject: `Website enquiry ${enquiryId} from ${parsed.data.name}`,
    text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone || 'not provided'}\n\n${parsed.data.message}`,
  })

  return NextResponse.json({
    reference: enquiryId,
    message: 'Thank you. We reply to every message within one working day.',
  })
}
