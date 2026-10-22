'use server'

import { registerSchema } from '@/lib/validation'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { createAccount } from '@/lib/accounts'
import { saveRecord } from '@/lib/store'

export type RegisterResult =
  | { ok: true; email: string; name: string }
  | { ok: false; error: string; requiresChallenge?: boolean }

export async function registerBuyer(input: {
  name: string
  email: string
  password: string
  captchaToken?: string
}): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input)

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return { ok: false, error: firstIssue?.message ?? 'Please check your details.' }
  }

  const captcha = await verifyRecaptcha(parsed.data.captchaToken, 'register')

  if (!captcha.success) {
    return {
      ok: false,
      error: 'We could not verify this request. Please complete the challenge and try again.',
      requiresChallenge: true,
    }
  }

  const created = createAccount({
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (!created.ok) {
    return { ok: false, error: created.error }
  }

  await saveRecord('account', created.account.email, {
    id: created.account.id,
    name: created.account.name,
    email: created.account.email,
    createdAt: created.account.createdAt,
  })

  return { ok: true, email: created.account.email, name: created.account.name }
}
