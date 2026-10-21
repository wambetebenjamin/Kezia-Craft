'use client'

import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import Lenis from 'lenis'

function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SmoothScroll />
      {children}
    </SessionProvider>
  )
}
