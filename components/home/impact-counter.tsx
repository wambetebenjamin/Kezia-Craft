'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { impactStats } from '@/lib/data'

export function ImpactCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = numberRefs.current.filter(Boolean) as HTMLSpanElement[]

    if (reduced) {
      targets.forEach((element, index) => {
        element.textContent = impactStats[index].value.toLocaleString('en-KE')
      })
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      targets.forEach((element, index) => {
        const stat = impactStats[index]
        const counter = { value: 0 }

        gsap.to(counter, {
          value: stat.value,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            element.textContent = Math.round(counter.value).toLocaleString('en-KE')
          },
        })
      })
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Our impact"
      className="relative overflow-hidden bg-night py-12 sm:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="container-kc relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-leaf">The difference we make together</span>
          <h2 className="mt-3 text-2xl text-white sm:text-3xl lg:text-4xl">
            Every order keeps a workshop open
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Kezia Craft pays makers within 48 hours of delivery and reinvests a share of every sale
            into craft training for young people.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl leading-none text-white sm:text-4xl lg:text-5xl">
                <span ref={(element) => { numberRefs.current[index] = element }}>0</span>
                <span className="text-leaf">{stat.suffix}</span>
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
