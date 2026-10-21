import Link from 'next/link'
import { ArrowRight, Home, ShoppingBag } from 'lucide-react'
import { whatsappLink } from '@/lib/site'

export default function NotFound() {
  return (
    <section className="section-kc bg-mist">
      <div className="container-kc">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-display text-[72px] leading-none text-primary sm:text-[96px]">404</span>
          <h1 className="mt-2 text-2xl text-ink sm:text-3xl">This page has wandered off the loom</h1>
          <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
            We could not find the page you were looking for. It may have moved, or the link might be
            older than the collection. Try the shop, or message us and we will help you find it.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="bg_btn w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" /> Back home
            </Link>
            <Link href="/shop" className="tp_btn w-full sm:w-auto">
              <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" /> Shop handmade
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
            {[
              { href: '/artisans', label: 'Meet the makers' },
              { href: '/sell', label: 'Sell on Kezia Craft' },
              { href: '/about', label: 'Our story' },
              { href: '/cart', label: 'Your cart' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[44px] items-center justify-between rounded-md border border-line bg-white px-4 text-sm text-ink transition hover:border-primary hover:text-primary"
              >
                {link.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs text-ash">
            Still stuck?{' '}
            <a
              href={whatsappLink('Hi Kezia Craft, I could not find a page on your site.')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Message us on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
