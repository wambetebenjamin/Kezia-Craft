import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Server error',
  description: 'Something went wrong on our side. Message Kezia Craft on WhatsApp for help.',
}

export default function ServerErrorPage() {
  return (
    <section className="section-kc bg-mist">
      <div className="container-kc">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-display text-[72px] leading-none text-brand sm:text-[96px]">500</span>
          <h1 className="mt-2 text-2xl text-ink sm:text-3xl">The workshop is temporarily closed</h1>
          <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
            Something went wrong while loading this page. Nothing has been charged and your cart is
            untouched. Message us on WhatsApp and we will sort it out personally.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink('Hi Kezia Craft, I hit a server error on your website.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg_btn w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp +254 112 272 061
            </a>
            <Link href="/" className="tp_btn w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" /> Back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
