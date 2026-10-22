'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Home, MessageCircle, RotateCcw } from 'lucide-react'
import { whatsappLink } from '@/lib/site'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[kezia-craft] Unhandled error', error)
  }, [error])

  return (
    <section className="section-kc bg-mist">
      <div className="container-kc">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-display text-[72px] leading-none text-brand sm:text-[96px]">500</span>
          <h1 className="mt-2 text-2xl text-ink sm:text-3xl">Something slipped on our side</h1>
          <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
            We hit an unexpected error while preparing this page. Your cart is safe. Try again, or
            message us on WhatsApp and our team in Nairobi will help you straight away.
          </p>
          {error.digest && (
            <p className="mt-2 text-xs text-ash">Reference {error.digest}</p>
          )}

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="bg_btn w-full sm:w-auto">
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" /> Try again
            </button>
            <a
              href={whatsappLink('Hi Kezia Craft, I hit an error on your website.')}
              target="_blank"
              rel="noopener noreferrer"
              className="tp_btn w-full sm:w-auto"
            >
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp +254 112 272 061
            </a>
          </div>

          <Link href="/" className="more_btn mt-6 inline-flex items-center gap-1">
            <Home className="h-4 w-4" aria-hidden="true" /> Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
