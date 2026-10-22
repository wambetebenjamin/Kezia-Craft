import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, BarChart3, ClipboardList, Package, Truck, Wallet } from 'lucide-react'
import { SellerForm } from '@/components/sell/seller-form'
import { Reveal } from '@/components/reveal'
import { whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sell on Kezia Craft',
  description:
    'Reach buyers across Kenya and beyond. Zero listing fees, a simple seller dashboard, secure payments and shipping support for East African artisans.',
}

const benefits = [
  {
    Icon: BadgeCheck,
    title: 'Zero listing fee',
    copy: 'List as many pieces as you like. We only take a small commission when something sells.',
  },
  {
    Icon: BarChart3,
    title: 'Simple dashboard',
    copy: 'See orders, stock and payouts in one place, in English or Swahili, on any phone.',
  },
  {
    Icon: Wallet,
    title: 'Secure payments',
    copy: 'Buyers pay through M-Pesa or card. You are paid within 48 hours of delivery.',
  },
  {
    Icon: Truck,
    title: 'Shipping support',
    copy: 'We arrange courier pickup from your workshop and handle tracking for both of you.',
  },
]

const steps = [
  {
    Icon: ClipboardList,
    title: 'Apply',
    copy: 'Send us your details and a sample product description. We reply within three working days.',
  },
  {
    Icon: Package,
    title: 'List your products',
    copy: 'We photograph and write up your first collection with you, then you keep it fresh yourself.',
  },
  {
    Icon: Wallet,
    title: 'Start selling',
    copy: 'Orders arrive by WhatsApp and email. Pack, hand over to the courier and get paid.',
  },
]

export default function SellPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night">
        <div className="absolute inset-0 -z-10 opacity-40">
          <Image
            src="/images/leather-cover.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container-kc grid grid-cols-1 items-center gap-8 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="eyebrow text-leaf">For artisans and studios</span>
            <h1 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              Reach buyers across Kenya and beyond
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Kezia Craft brings your work to buyers in Nairobi, Mombasa, Kampala, London and
              beyond, while you stay in your workshop doing what you do best.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#apply" className="bg_btn w-full sm:w-auto">
                Apply to sell
              </a>
              <a
                href={whatsappLink('Hi Kezia Craft, I would like to know more about selling on the marketplace.')}
                target="_blank"
                rel="noopener noreferrer"
                className="tp_btn w-full border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
              >
                Ask a question
              </a>
            </div>
            <p className="mt-4 text-xs text-muted">
              480 makers already selling. No listing fees. Payouts through M-Pesa.
            </p>
          </div>
        </div>
      </section>

      <section className="section-kc bg-white">
        <div className="container-kc">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why makers choose us</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">Built around the workshop</h2>
            <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
              No photography studio required, no complicated software, no waiting months for payment.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 0.08} y={22}>
                <div className="h-full rounded-lg border border-line bg-mist p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-kc bg-mist">
        <div className="container-kc">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How to start</span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl">Three steps to your first order</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map(({ Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 0.1} y={26}>
                <div className="relative h-full rounded-lg border border-line bg-white p-5">
                  <span className="absolute right-4 top-4 font-display text-4xl text-line">
                    0{index + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-lg text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section-kc bg-white">
        <div className="container-kc">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-[90px]">
              <span className="eyebrow">Artisan application</span>
              <h2 className="mt-2 text-2xl sm:text-3xl">Your craft, on the map</h2>
              <p className="mt-3 text-sm leading-relaxed text-body sm:text-base">
                We visit every new studio in person where we can, so we can tell your story honestly
                to buyers. Applications are reviewed by our Nairobi team.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-body">
                {[
                  'No listing fees, ever',
                  'Photography and copy support',
                  'Payouts within 48 hours of delivery',
                  'Shipping arranged from your workshop',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-mist p-4">
                <p className="text-sm text-body">
                  Prefer to talk first?{' '}
                  <a
                    href={whatsappLink('Hi Kezia Craft, I would like to talk about selling my craft.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    Message us on WhatsApp
                  </a>{' '}
                  or read the{' '}
                  <Link href="/legal/terms" className="font-semibold text-primary hover:underline">
                    marketplace terms
                  </Link>
                  .
                </p>
              </div>
            </div>

            <SellerForm />
          </div>
        </div>
      </section>
    </>
  )
}
