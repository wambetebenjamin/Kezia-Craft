'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback'?: () => void
          theme?: 'light' | 'dark'
        }
      ) => number
      reset: (id?: number) => void
    }
  }
}

const V3_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const V2_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY ?? V3_KEY

function loadScript(src: string, id: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.id = id
    script.src = src
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'))
    document.head.appendChild(script)
  })
}

/**
 * Invisible reCAPTCHA v3 for every form. The token is verified server side.
 * When the server reports a score below 0.5 the caller reveals the v2
 * challenge returned below, so a human can continue.
 */
export function useRecaptcha(action: string) {
  const [challengeVisible, setChallengeVisible] = useState(false)
  const [challengeToken, setChallengeToken] = useState<string | undefined>()

  const execute = useCallback(async (): Promise<string | undefined> => {
    if (challengeVisible && challengeToken) return challengeToken
    if (!V3_KEY) return undefined

    try {
      await loadScript(
        `https://www.google.com/recaptcha/api.js?render=${V3_KEY}`,
        'recaptcha-v3'
      )
      await new Promise<void>((resolve) => {
        if (window.grecaptcha?.ready) window.grecaptcha.ready(() => resolve())
        else resolve()
      })
      return await window.grecaptcha!.execute(V3_KEY, { action })
    } catch {
      return undefined
    }
  }, [action, challengeVisible, challengeToken])

  const challenge = challengeVisible ? (
    <RecaptchaV2 onToken={setChallengeToken} />
  ) : null

  return { execute, challenge, revealChallenge: () => setChallengeVisible(true) }
}

export function RecaptchaV2({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!V2_KEY) {
      setError(true)
      return
    }

    let widgetId: number | undefined

    loadScript('https://www.google.com/recaptcha/api.js?render=explicit', 'recaptcha-v2')
      .then(() => {
        const ready = () => {
          if (!containerRef.current || !window.grecaptcha) return
          widgetId = window.grecaptcha.render(containerRef.current, {
            sitekey: V2_KEY,
            callback: onToken,
            theme: 'light',
          })
        }
        if (window.grecaptcha?.ready) window.grecaptcha.ready(ready)
        else ready()
      })
      .catch(() => setError(true))

    return () => {
      if (widgetId !== undefined && window.grecaptcha) window.grecaptcha.reset(widgetId)
    }
  }, [onToken])

  return (
    <div className="mt-3 rounded-md border border-line bg-mist p-3">
      <p className="mb-2 text-xs text-body">
        Please confirm you are human to continue with this request.
      </p>
      <div ref={containerRef} />
      {error && (
        <p className="text-xs text-alert">
          The verification widget could not load. Message us on WhatsApp and we will help.
        </p>
      )}
    </div>
  )
}
