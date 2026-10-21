import type { Metadata } from 'next'
import Link from 'next/link'
import { CartClient } from '@/components/cart/cart-client'

export const metadata: Metadata = {
  title: 'Your cart',
  description: 'Review the handmade pieces in your Kezia Craft cart and proceed to checkout.',
}

export default function CartPage() {
  return (
    <>
      <section className="border-b border-line bg-mist py-6 sm:py-8">
        <div className="container-kc">
          <nav aria-label="Breadcrumb" className="text-xs text-ash">
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">Cart</span>
          </nav>
          <h1 className="mt-2 text-2xl text-ink sm:text-3xl">Your cart</h1>
        </div>
      </section>

      <CartClient />
    </>
  )
}
