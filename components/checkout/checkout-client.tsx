'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CreditCard, Loader2, Smartphone } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { COUNTIES, formatKES, FREE_SHIPPING_THRESHOLD, SHIPPING_ESTIMATE } from '@/lib/site'
import { useRecaptcha } from '@/components/recaptcha'

type Details = {
  fullName: string
  email: string
  phone: string
  address: string
  county: string
  notes: string
}

const STEPS = [
  { id: 1, label: 'Delivery' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Review' },
]

const emptyDetails: Details = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  county: '',
  notes: '',
}

export function CheckoutClient() {
  const items = useCart((state) => state.items)
  const clearCart = useCart((state) => state.clearCart)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1)
  const [details, setDetails] = useState<Details>(emptyDetails)
  const [payment, setPayment] = useState<'mpesa' | 'card'>('mpesa')
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const [confirmation, setConfirmation] = useState<{ id: string; total: number } | null>(null)
  const { execute, challenge, revealChallenge } = useRecaptcha('place_order')

  useEffect(() => setMounted(true), [])

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_ESTIMATE
  const total = subtotal + shipping

  const update = (key: keyof Details, value: string) => {
    setDetails((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validateDetails = () => {
    const next: Partial<Record<keyof Details, string>> = {}
    if (details.fullName.trim().length < 2) next.fullName = 'Please enter your full name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(details.email)) next.email = 'Please enter a valid email.'
    if (!/^[0-9+\s-]{9,}$/.test(details.phone)) next.phone = 'Please enter a valid phone number.'
    if (details.address.trim().length < 5) next.address = 'Please enter your delivery address.'
    if (!details.county) next.county = 'Please choose your county.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goToPayment = () => {
    if (validateDetails()) setStep(2)
  }

  const placeOrder = async () => {
    if (!validateDetails()) {
      setStep(1)
      return
    }

    setStatus('loading')
    setServerError('')
    const token = await execute()

    try {
      const response = await fetch('/api/orders/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...details,
          paymentMethod: payment,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          captchaToken: token,
        }),
      })

      const data = (await response.json()) as {
        order?: { id: string; total: number }
        error?: string
        requiresChallenge?: boolean
      }

      if (!response.ok || !data.order) {
        if (data.requiresChallenge) revealChallenge()
        setStatus('error')
        setServerError(data.error ?? 'We could not place your order. Please try again.')
        return
      }

      setConfirmation({ id: data.order.id, total: data.order.total })
      clearCart()
      setStatus('idle')
    } catch {
      setStatus('error')
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  if (!mounted) {
    return (
      <div className="container-kc py-16">
        <div className="h-48 animate-pulse rounded-lg bg-mist" aria-hidden="true" />
      </div>
    )
  }

  if (confirmation) {
    return (
      <div className="container-kc py-12 sm:py-16">
        <div className="mx-auto max-w-xl rounded-lg border border-line bg-white p-6 text-center shadow-card sm:p-8">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-2xl text-ink">Asante sana, your order is in</h2>
          <p className="mt-2 text-sm leading-relaxed text-body">
            Order <strong className="text-ink">{confirmation.id}</strong> for{' '}
            {formatKES(confirmation.total)} has been received. A confirmation email is on its way and
            the maker will begin packing your piece today.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-body">
            We will message you on WhatsApp when your parcel leaves the workshop.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href="/orders" className="bg_btn w-full sm:w-auto">
              View your orders
            </Link>
            <Link href="/shop" className="tp_btn w-full sm:w-auto">
              Keep shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container-kc py-16 text-center sm:py-24">
        <h2 className="text-2xl text-ink">There is nothing to check out yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-body">
          Add a handmade piece to your cart and come back to complete your order.
        </p>
        <Link href="/shop" className="bg_btn mt-6">
          Browse the shop
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="container-kc py-8 pb-32 sm:py-12 sm:pb-12">
        <div className="mx-auto max-w-3xl">
          <ol className="flex items-center gap-2 sm:gap-4" aria-label="Checkout progress">
            {STEPS.map((item) => {
              const state = step === item.id ? 'current' : step > item.id ? 'done' : 'upcoming'
              return (
                <li key={item.id} className="flex flex-1 items-center gap-2 sm:gap-3">
                  <span
                    aria-current={state === 'current' ? 'step' : undefined}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                      state === 'done'
                        ? 'border-primary bg-primary text-white'
                        : state === 'current'
                          ? 'border-primary bg-white text-primary'
                          : 'border-line bg-white text-ash'
                    }`}
                  >
                    {state === 'done' ? <Check className="h-4 w-4" aria-hidden="true" /> : item.id}
                  </span>
                  <span
                    className={`hidden text-sm sm:block ${
                      state === 'upcoming' ? 'text-ash' : 'text-ink'
                    }`}
                  >
                    {item.label}
                    <span className="sr-only"> step {item.id}</span>
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div
              className="h-full rounded-full bg-sweep transition-[width] duration-500 ease-out"
              style={{ width: `${(step / STEPS.length) * 100}%` }}
            />
          </div>

          {step === 1 && (
            <section className="mt-8" aria-labelledby="step-one">
              <h2 id="step-one" className="text-xl text-ink sm:text-2xl">
                Delivery details
              </h2>
              <p className="mt-1 text-sm text-body">
                Tell us where the parcel should go. We deliver countrywide and to 26 countries.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="field-label">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    value={details.fullName}
                    onChange={(event) => update('fullName', event.target.value)}
                    className="field-input"
                    autoComplete="name"
                    placeholder="Amani Wanjala"
                    aria-invalid={Boolean(errors.fullName)}
                  />
                  {errors.fullName && <p className="field-error">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="field-label">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={details.email}
                    onChange={(event) => update('email', event.target.value)}
                    className="field-input"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <p className="field-error">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="field-label">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={details.phone}
                    onChange={(event) => update('phone', event.target.value)}
                    className="field-input"
                    autoComplete="tel"
                    placeholder="0712 345 678"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <p className="field-error">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="field-label">
                    Delivery address
                  </label>
                  <input
                    id="address"
                    value={details.address}
                    onChange={(event) => update('address', event.target.value)}
                    className="field-input"
                    autoComplete="street-address"
                    placeholder="House or building, street, area"
                    aria-invalid={Boolean(errors.address)}
                  />
                  {errors.address && <p className="field-error">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="county" className="field-label">
                    County
                  </label>
                  <select
                    id="county"
                    value={details.county}
                    onChange={(event) => update('county', event.target.value)}
                    className="field-input"
                    aria-invalid={Boolean(errors.county)}
                  >
                    <option value="">Select a county</option>
                    {COUNTIES.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                  {errors.county && <p className="field-error">{errors.county}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="field-label">
                    Delivery notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={details.notes}
                    onChange={(event) => update('notes', event.target.value)}
                    className="field-input resize-y"
                    placeholder="Landmark, gate colour, best time to call"
                  />
                </div>
              </div>

              <div className="mt-6 hidden sm:flex sm:justify-between">
                <Link href="/cart" className="tp_btn">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back to cart
                </Link>
                <button type="button" onClick={goToPayment} className="bg_btn">
                  Continue to payment <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="mt-8" aria-labelledby="step-two">
              <h2 id="step-two" className="text-xl text-ink sm:text-2xl">
                Payment method
              </h2>
              <p className="mt-1 text-sm text-body">
                Choose how you would like to pay. Payment is collected after your order is
                confirmed by the maker.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(
                  [
                    {
                      id: 'mpesa' as const,
                      title: 'M-Pesa',
                      copy: 'Pay from your phone. You will receive an STK prompt on the number above.',
                      Icon: Smartphone,
                    },
                    {
                      id: 'card' as const,
                      title: 'Card',
                      copy: 'Visa or Mastercard. Card details are collected on a secure hosted page.',
                      Icon: CreditCard,
                    },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer gap-3 rounded-lg border p-4 transition ${
                      payment === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-line bg-white hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                      className="mt-1 h-5 w-5 accent-primary"
                    />
                    <span>
                      <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <option.Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                        {option.title}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-body">
                        {option.copy}
                      </span>
                      <span className="mt-2 block text-[11px] uppercase tracking-[0.1em] text-ash">
                        Placeholder integration
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-6 hidden sm:flex sm:justify-between">
                <button type="button" onClick={() => setStep(1)} className="tp_btn">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button type="button" onClick={() => setStep(3)} className="bg_btn">
                  Review order <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="mt-8" aria-labelledby="step-three">
              <h2 id="step-three" className="text-xl text-ink sm:text-2xl">
                Review and confirm
              </h2>
              <p className="mt-1 text-sm text-body">
                Check your details and the pieces in your order before confirming.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-line bg-white p-4">
                  <h3 className="text-sm font-semibold text-ink">Delivering to</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {details.fullName}
                    <br />
                    {details.phone}
                    <br />
                    {details.email}
                    <br />
                    {details.address}, {details.county}
                    {details.notes ? (
                      <>
                        <br />
                        <span className="text-ash">Notes: {details.notes}</span>
                      </>
                    ) : null}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="more_btn mt-3 inline-block text-xs"
                  >
                    Edit details
                  </button>
                </div>

                <div className="rounded-lg border border-line bg-white p-4">
                  <h3 className="text-sm font-semibold text-ink">Paying with</h3>
                  <p className="mt-2 text-sm text-body">
                    {payment === 'mpesa' ? 'M-Pesa' : 'Card'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="more_btn mt-3 inline-block text-xs"
                  >
                    Change payment method
                  </button>
                </div>
              </div>

              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 rounded-lg border border-line bg-white p-3">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                      <p className="text-xs text-ash">
                        {item.artisan} · Quantity {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-ink">
                      {formatKES(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-2 rounded-lg border border-line bg-mist p-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-body">Subtotal</dt>
                  <dd className="text-ink">{formatKES(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-body">Delivery</dt>
                  <dd className="text-ink">{shipping === 0 ? 'Free' : formatKES(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
                  <dt className="text-ink">Total</dt>
                  <dd className="text-ink">{formatKES(total)}</dd>
                </div>
              </dl>

              {serverError && (
                <p role="alert" className="mt-4 rounded-md bg-alert/10 p-3 text-sm text-alert">
                  {serverError}
                </p>
              )}
              {challenge}

              <div className="mt-6 hidden sm:flex sm:justify-between">
                <button type="button" onClick={() => setStep(2)} className="tp_btn">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Back
                </button>
                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={status === 'loading'}
                  className="bg_btn min-w-[200px]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Placing order
                    </>
                  ) : (
                    <>Confirm order · {formatKES(total)}</>
                  )}
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Sticky mobile action bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-[9980] border-t border-line bg-white p-3 pb-safe transition-[bottom] duration-300 sm:hidden"
        style={{ bottom: 'var(--kc-consent-offset, 0px)' }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-ash">
              Step {step} of {STEPS.length}
            </p>
            <p className="text-base font-semibold text-ink">{formatKES(total)}</p>
          </div>
          {step === 1 && (
            <button type="button" onClick={goToPayment} className="bg_btn flex-1">
              Continue
            </button>
          )}
          {step === 2 && (
            <button type="button" onClick={() => setStep(3)} className="bg_btn flex-1">
              Review
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              onClick={placeOrder}
              disabled={status === 'loading'}
              className="bg_btn flex-1"
            >
              {status === 'loading' ? 'Placing...' : 'Confirm order'}
            </button>
          )}
        </div>
      </div>
    </>
  )
}
