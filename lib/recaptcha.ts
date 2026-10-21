import type { NextRequest } from 'next/server'

export type RecaptchaResult = {
  success: boolean
  score: number
  action?: string
  /** True when the score is below 0.5, so the client should render a v2 challenge. */
  requiresChallenge: boolean
}

/**
 * Verifies a reCAPTCHA v3 token on the server only. RECAPTCHA_SECRET_KEY is never
 * exposed to the client. When no secret is configured (local development) the
 * check passes with a neutral score so forms stay usable.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  action: string,
  request?: NextRequest
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    return { success: true, score: 1, action, requiresChallenge: false }
  }

  if (!token) {
    return { success: false, score: 0, action, requiresChallenge: true }
  }

  try {
    const body = new URLSearchParams({ secret, response: token })
    const ip = request?.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    if (ip) body.set('remoteip', ip)

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    })

    const data = (await response.json()) as { success: boolean; score?: number; action?: string }
    const score = typeof data.score === 'number' ? data.score : 0

    return {
      success: Boolean(data.success),
      score,
      action: data.action,
      requiresChallenge: !data.success || score < 0.5,
    }
  } catch {
    return { success: false, score: 0, action, requiresChallenge: true }
  }
}
