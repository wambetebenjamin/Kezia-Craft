import { NextResponse, type NextRequest } from 'next/server'
import { newsletterSchema } from '@/lib/validation'
import { saveRecord } from '@/lib/store'
import { sendMail } from '@/lib/mail'

export async function POST(request: NextRequest) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = newsletterSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors.email?.[0] ?? 'Please enter a valid email.' },
      { status: 422 }
    )
  }

  const email = parsed.data.email.toLowerCase()

  await saveRecord('newsletter', email, {
    email,
    subscribedAt: new Date().toISOString(),
    source: 'website',
  })

  await sendMail({
    to: email,
    subject: 'Karibu to the Kezia Craft letter',
    text: 'Asante sana for joining the Kezia Craft letter. Once a month we share new collections, maker stories and market dates. You can unsubscribe at any time by replying to this email.',
  })

  return NextResponse.json({ message: 'You are on the list. Karibu!' })
}
