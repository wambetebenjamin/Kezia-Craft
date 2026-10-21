'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'kezia-craft-cookie-consent'

type Preferences = {
  necessary: true
  functional: boolean
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [prefs, setPrefs] = useState({
    functional: true,
    analytics: true,
    marketing: false,
  })

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      const timer = window.setTimeout(() => setVisible(true), 1200)
      return () => window.clearTimeout(timer)
    }
    try {
      const parsed = JSON.parse(stored) as Preferences
      setPrefs({
        functional: parsed.functional,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
      })
    } catch {
      setVisible(true)
    }
  }, [])

  useEffect(() => {
    const offset = visible ? '10rem' : '0px'
    document.documentElement.style.setProperty('--kc-consent-offset', offset)
    document.body.style.paddingBottom = offset
    return () => {
      document.documentElement.style.setProperty('--kc-consent-offset', '0px')
      document.body.style.paddingBottom = ''
    }
  }, [visible])

  useEffect(() => {
    if (!showModal) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowModal(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showModal])

  const save = (next: { functional: boolean; analytics: boolean; marketing: boolean }) => {
    const payload: Preferences = { necessary: true, ...next, updatedAt: new Date().toISOString() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setPrefs(next)
    setVisible(false)
    setShowModal(false)
  }

  return (
    <>
      {visible && (
        <div className="fixed inset-x-0 bottom-0 z-[9997] px-3 pb-safe sm:px-6">
          <div
            className="mx-auto mb-3 w-full max-w-5xl rounded-t-2xl border border-line bg-white shadow-float sm:mb-4 sm:rounded-2xl"
            role="dialog"
            aria-label="Cookie consent"
            aria-live="polite"
          >
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <p className="text-sm leading-relaxed text-body">
                We use cookies to keep your cart working, remember your preferences and understand
                how the marketplace is used. You can accept all cookies or choose what you allow.
                Read our{' '}
                <a href="/legal/cookie-policy" className="more_btn">
                  cookie policy
                </a>
                .
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="tp_btn w-full sm:w-auto"
                >
                  Manage Preferences
                </button>
                <button
                  type="button"
                  onClick={() => save({ functional: true, analytics: true, marketing: true })}
                  className="bg_btn w-full sm:w-auto"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-plum/60 p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
        >
          <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-float sm:max-w-lg sm:rounded-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="cookie-modal-title" className="text-xl text-ink">
                  Cookie preferences
                </h2>
                <p className="mt-2 text-sm text-body">
                  Choose which cookies Kezia Craft may use. Necessary cookies keep your cart and
                  login working and cannot be switched off.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close cookie preferences"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-ash transition hover:bg-mist hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-start justify-between gap-4 rounded-lg border border-line p-3">
                <div>
                  <p className="text-sm font-semibold text-ink">Necessary</p>
                  <p className="text-xs leading-relaxed text-body">
                    Cart, checkout session and security. Always on.
                  </p>
                </div>
                <span className="pt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  Locked
                </span>
              </div>

              {(
                [
                  ['functional', 'Functional', 'Remembers your language, wishlist and forms.'],
                  ['analytics', 'Analytics', 'Aggregated page views that help us improve the shop.'],
                  ['marketing', 'Marketing', 'Measures how our artisan stories reach new buyers.'],
                ] as const
              ).map(([key, label, description]) => (
                <label
                  key={key}
                  className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-line p-3 transition hover:border-primary/40"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink">{label}</span>
                    <span className="block text-xs leading-relaxed text-body">{description}</span>
                  </span>
                  <span className="flex items-center pt-1">
                    <input
                      type="checkbox"
                      checked={prefs[key]}
                      onChange={(event) =>
                        setPrefs((current) => ({ ...current, [key]: event.target.checked }))
                      }
                      className="h-5 w-5 min-h-[20px] min-w-[20px] accent-primary"
                    />
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => save({ functional: false, analytics: false, marketing: false })}
                className="tp_btn w-full sm:w-auto"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => save(prefs)}
                className="bg_btn w-full sm:w-auto"
              >
                Save preferences
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ash">
              Stored locally under kezia-craft-cookie-consent. Your choices are handled under the
              Kenya Data Protection Act 2019.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
