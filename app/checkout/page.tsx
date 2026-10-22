import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckoutClient } from '@/components/checkout/checkout-client'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your Kezia Craft order with M-Pesa or card, delivered anywhere in Kenya.',
}

export default function CheckoutPage() {
  return (
    <>
      <section className="border-b border-line bg-mist py-6 sm:py-8">
        <div className="container-kc">
          <nav aria-label="Breadcrumb" className="text-xs text-ash">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/cart" className="transition hover:text-primary">
              Cart
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">Checkout</span>
          </nav>
          <h1 className="mt-2 text-2xl text-ink sm:text-3xl">Checkout</h1>
        </div>
      </section>

      <CheckoutClient />
    </>
  )
}
