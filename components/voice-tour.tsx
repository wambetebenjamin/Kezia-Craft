'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const TOUR_SCRIPT =
  "Welcome to Kezia Craft, the marketplace for handmade goods from East Africa's most talented artisans. Whether you are looking for a hand-woven basket from Kisumu, beadwork from the Maasai highlands, or leather goods from Nairobi, you will find it here. Every purchase directly supports the maker behind the product. Scroll down to shop, or if you are an artisan, find out how to start selling today."

export function VoiceTour() {
  const [muted, setMuted] = useState(true)
  const [speaking, setSpeaking] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [supported, setSupported] = useState(false)
  const startedRef = useRef(false)
  const mutedRef = useRef(true)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(TOUR_SCRIPT)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.lang = 'en-KE'
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => {
      setSpeaking(false)
      setHasPlayed(true)
    }
    utterance.onerror = () => {
      setSpeaking(false)
      setHasPlayed(true)
    }

    setMuted(false)
    mutedRef.current = false
    window.speechSynthesis.speak(utterance)
  }, [])

  useEffect(() => {
    setSupported('speechSynthesis' in window)

    const startOnce = (event: Event) => {
      if (startedRef.current) return
      const target = event.target as HTMLElement | null
      if (target?.closest?.('[data-voice-tour]')) return
      startedRef.current = true
      speak()
      window.removeEventListener('scroll', startOnce)
      window.removeEventListener('pointerdown', startOnce)
    }

    window.addEventListener('scroll', startOnce, { passive: true })
    window.addEventListener('pointerdown', startOnce, { passive: true })

    return () => {
      window.removeEventListener('scroll', startOnce)
      window.removeEventListener('pointerdown', startOnce)
    }
  }, [speak])

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  if (!supported) return null

  const toggle = () => {
    if (speaking || !muted) {
      stop()
      setMuted(true)
      mutedRef.current = true
      setHasPlayed(true)
      return
    }
    speak()
  }

  const label = hasPlayed && !speaking ? 'Replay tour' : 'Site voice tour, click to mute'

  return (
    <div
      className="bottom-safe fixed left-6 z-[9998]"
    >
      <button
        type="button"
        data-voice-tour
        onClick={toggle}
        aria-label={label}
        title={hasPlayed && !speaking ? 'Replay tour' : 'Hear what this site is about'}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-float transition hover:scale-105 hover:text-ink ${
          speaking ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
      >
        {speaking && (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full border-2 border-primary opacity-60"
          />
        )}
        {muted && !speaking ? (
          <VolumeX className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Volume2 className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="pointer-events-none absolute bottom-16 left-0 hidden whitespace-nowrap rounded-md bg-ink px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
          {hasPlayed && !speaking ? 'Replay tour' : 'Hear what this site is about'}
        </span>
      </button>
    </div>
  )
}
