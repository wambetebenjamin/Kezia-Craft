'use client'

import { useEffect, useState } from 'react'
import { SITE, whatsappLink } from '@/lib/site'

export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div
      className="bottom-safe fixed right-6 z-[9998]"
    >
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-float transition hover:scale-105 ${
          mounted ? 'animate-pulse-ring' : 'scale-0'
        }`}
        style={{ transitionProperty: 'transform, box-shadow' }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.5.07-.77.37-.26.3-1 .97-1 2.38 0 1.4 1.02 2.76 1.16 2.96.15.2 2 3.18 4.87 4.33 2.87 1.15 2.87.77 3.39.72.52-.05 1.68-.68 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.27-.2-.57-.35Z" />
          <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.86 9.86 0 0 0 4.69 1.19h.01c5.44 0 9.87-4.43 9.87-9.87S17.48 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.14 8.14 0 0 1-1.25-4.31c0-4.51 3.68-8.19 8.2-8.19a8.19 8.19 0 0 1 8.18 8.2c0 4.51-3.67 8.14-8.18 8.14Z" />
        </svg>
        <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          Chat with us on WhatsApp
        </span>
      </a>
      <span className="sr-only">{SITE.name} WhatsApp support</span>
    </div>
  )
}
