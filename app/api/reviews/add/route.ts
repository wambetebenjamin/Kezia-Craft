import { NextResponse, type NextRequest } from 'next/server'
import { reviewSchema } from '@/lib/validation'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { getProduct } from '@/lib/data'
import { saveRecord } from '@/lib/store'

export async function POST(request: NextRequest) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = reviewSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const product = getProduct(parsed.data.productSlug)

  if (!product) {
    return NextResponse.json({ error: 'We could not find that product.' }, { status: 404 })
  }

  const captcha = await verifyRecaptcha(parsed.data.captchaToken, 'add_review', request)

  if (!captcha.success) {
    return NextResponse.json(
      {
        error: 'We could not verify this request. Please complete the challenge and try again.',
        requiresChallenge: true,
      },
      { status: 403 }
    )
  }

  const review = {
    id: `REV-${Date.now().toString().slice(-6)}`,
    productSlug: parsed.data.productSlug,
    name: parsed.data.name,
    rating: parsed.data.rating,
    comment: parsed.data.comment,
    createdAt: new Date().toISOString(),
  }

  await saveRecord('review', review.id, review)

  return NextResponse.json({
    review,
    message: 'Thank you. Your review is queued for moderation and will appear shortly.',
  })
}
