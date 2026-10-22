'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Loader2, LogIn } from 'lucide-react'

export function LoginForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') ?? '/orders'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!result || result.error) {
      setStatus('error')
      setError('Those details did not match an account. Try the demo login below.')
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  const useDemo = () => {
    setEmail('buyer@keziacraft.co.ke')
    setPassword('kezia2026')
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
        <h1 className="text-2xl text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-body">
          Log in to see your orders, saved pieces and delivery updates.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="login-email" className="field-label">
              Email
            </label>
            <input
              id="login-email"
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
            <label htmlFor="login-password" className="field-label">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field-input"
              autoComplete="current-password"
              placeholder="Your password"
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
                <LogIn className="mr-2 h-4 w-4" aria-hidden="true" /> Log in
              </>
            )}
          </button>
        </form>

        {googleEnabled && (
          <>
            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-line" />
              <span className="text-xs uppercase tracking-[0.1em] text-ash">or</span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl })}
              className="tp_btn w-full"
            >
              Continue with Google
            </button>
          </>
        )}

        <div className="mt-5 rounded-md bg-mist p-3">
          <p className="text-xs leading-relaxed text-body">
            Demo buyer: buyer@keziacraft.co.ke with password kezia2026.{' '}
            <button type="button" onClick={useDemo} className="font-semibold text-primary hover:underline">
              Fill demo details
            </button>
          </p>
        </div>

        <p className="mt-5 text-center text-sm text-body">
          New to Kezia Craft?{' '}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
