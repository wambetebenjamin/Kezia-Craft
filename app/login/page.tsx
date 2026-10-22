import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to your Kezia Craft account to track orders and saved pieces.',
}

export default function LoginPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

  return (
    <section className="section-kc bg-mist">
      <div className="container-kc">
        <Suspense fallback={<div className="mx-auto h-96 w-full max-w-md animate-pulse rounded-lg bg-white" />}>
          <LoginForm googleEnabled={googleEnabled} />
        </Suspense>
      </div>
    </section>
  )
}
