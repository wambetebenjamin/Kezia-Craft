'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Loader2, UserPlus } from 'lucide-react'
import { useRecaptcha } from '@/components/recaptcha'
import { registerBuyer } from '@/app/register/actions'

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')
  const { execute, challenge, revealChallenge } = useRecaptcha('register')

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setError('')

    const token = await execute()
    const result = await registerBuyer({ name, email, password, captchaToken: token })

    if (!result.ok) {
      if (result.requiresChallenge) revealChallenge()
      setStatus('error')
      setError(result.error)
      return
    }

    const signedIn = await signIn('credentials', { email, password, redirect: false })

    if (signedIn && !signedIn.error) {
      router.push('/orders')
      router.refresh()
      return
    }

    router.push('/login')
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
      <h1 className="text-2xl text-ink">Create your account</h1>
      <p className="mt-1 text-sm text-body">
        Join conscious buyers supporting East African makers. It takes a minute.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="register-name" className="field-label">
            Full name
          </label>
          <input
            id="register-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="field-input"
            autoComplete="name"
            placeholder="Amani Wanjala"
          />
        </div>

        <div>
          <label htmlFor="register-email" className="field-label">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field-input"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="register-password" className="field-label">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="field-input"
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-md bg-alert/10 p-3 text-sm text-alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={status === 'loading'} className="submit_btn w-full">
          {status === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" /> Create account
            </>
          )}
        </button>
      </form>

      {challenge}

      <p className="mt-5 text-xs leading-relaxed text-ash">
        By creating an account you agree to our{' '}
        <Link href="/legal/terms" className="text-primary hover:underline">
          terms of service
        </Link>{' '}
        and{' '}
        <Link href="/legal/privacy-policy" className="text-primary hover:underline">
          privacy policy
        </Link>
        . Your data is handled under the Kenya Data Protection Act 2019.
      </p>

      <p className="mt-5 text-center text-sm text-body">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
