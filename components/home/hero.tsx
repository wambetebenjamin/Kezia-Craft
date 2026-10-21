'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: 0 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )

      gsap.fromTo(
        contentRef.current?.children ?? [],
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out', delay: 0.15 }
      )
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-ink"
      aria-label="Kezia Craft marketplace"
    >
      <div ref={imageRef} className="absolute inset-x-0 top-0 -z-10 h-[130%] w-full will-change-transform">
        <Image
          src="/images/hero-market.jpg"
          alt="Handmade baskets, beadwork and textiles displayed at a Nairobi market"
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-plum/85 via-plum/65 to-plum/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent" />
      </div>

      <div className="container-kc flex min-h-[560px] flex-col justify-center py-16 sm:min-h-[600px] sm:py-20 lg:min-h-[640px]">
        <div ref={contentRef} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur sm:text-xs">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            480+ makers across 47 counties
          </span>

          <h1 className="mt-5 font-display text-3xl leading-[1.12] text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Handmade in Africa, delivered to your door
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Shop baskets, pottery, beadwork and leather from East African artisans. Every purchase
            is packed by the maker and paid out directly to their workshop, from Nairobi to
            Mombasa.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/shop" className="bg_btn w-full sm:w-auto">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/sell"
              className="tp_btn w-full border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Sell on Kezia Craft
            </Link>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-xs text-white/80 sm:text-sm">
            <Sparkles className="h-4 w-4 text-leaf" aria-hidden="true" />
            Fair pay for makers. Free delivery in Nairobi over KES 5,000.
          </p>
        </div>
      </div>
    </section>
  )
}
