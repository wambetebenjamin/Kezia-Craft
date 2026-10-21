'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Briefcase,
  Circle,
  Gem,
  Hammer,
  Layers,
  Package,
  Scissors,
  Sparkles,
} from 'lucide-react'
import { CATEGORIES } from '@/lib/site'
import gsap from 'gsap'

const ICONS = {
  Layers,
  Circle,
  Sparkles,
  Briefcase,
  Hammer,
  Scissors,
  Gem,
  Package,
} as const

export function CategoryStrip() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!trackRef.current) return

    // A gentle nudge on load signals that the strip scrolls sideways.
    const tween = gsap.fromTo(
      trackRef.current,
      { x: 0 },
      {
        x: -36,
        duration: 0.9,
        delay: 1.1,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
        scrollTrigger: undefined,
      }
    )

    return () => {
      tween.kill()
    }
  }, [])

  const scrollBy = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 280, behavior: 'smooth' })
  }

  return (
    <section aria-label="Shop by craft" className="border-b border-line bg-white py-6 sm:py-8">
      <div className="container-kc">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl text-ink sm:text-3xl">Shop by craft</h2>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll categories left"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line text-ink transition hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll categories right"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line text-ink transition hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-2 no-scrollbar"
          role="list"
        >
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.icon as keyof typeof ICONS]
            return (
              <Link
                key={category.slug}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                role="listitem"
                className="chip snap-start flex-shrink-0 px-4 py-2"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {category.name}
              </Link>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] text-ash md:hidden">Swipe to see every craft</p>
      </div>
    </section>
  )
}
