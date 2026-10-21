import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/register-form'

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Create a Kezia Craft buyer account to track orders and support East African artisans.',
}

export default function RegisterPage() {
  return (
    <section className="section-kc bg-mist">
      <div className="container-kc">
        <RegisterForm />
      </div>
    </section>
  )
}
