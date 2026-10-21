'use client'

import { useEffect, useState } from 'react'

const THREADS = [0, 1, 2, 3, 4, 5, 6]

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const skipTimer = window.setTimeout(() => setShowSkip(true), 3000)
    const started = Date.now()

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started
      const next = Math.min(100, Math.round((elapsed / 2200) * 100))
      setProgress(next)
    }, 60)

    const done = window.setTimeout(() => {
      setProgress(100)
      setHidden(true)
    }, 2400)

    return () => {
      window.clearTimeout(skipTimer)
      window.clearTimeout(done)
      window.clearInterval(tick)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = hidden ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white px-6"
      role="status"
      aria-live="polite"
      aria-label={`Loading Kezia Craft, ${progress} percent`}
    >
      {reduced ? (
        <p className="font-sans text-lg text-ink">{progress}%</p>
      ) : (
        <>
          <svg
            viewBox="0 0 320 120"
            className="h-28 w-full max-w-[320px]"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="0.5" y="0.5" width="319" height="119" fill="none" stroke="#e5e5e5" />
            <line x1="8" y1="8" x2="8" y2="112" stroke="#744fff" strokeWidth="3" />
            <line x1="312" y1="8" x2="312" y2="112" stroke="#744fff" strokeWidth="3" />
            {THREADS.map((index) => {
              const y = 20 + index * 13
              return (
                <g key={index}>
                  <line
                    x1="14"
                    y1={y}
                    x2="306"
                    y2={y}
                    stroke={index % 2 === 0 ? '#2bc0a4' : '#21d397'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                      transformOrigin: '14px center',
                      transform: 'scaleX(0)',
                      animation: `loom-thread 620ms ease-out ${index * 190}ms forwards`,
                    }}
                  />
                  <rect
                    x={40 + index * 36}
                    y={y - 6}
                    width="8"
                    height="12"
                    fill="#8f6247"
                    style={{
                      opacity: 0,
                      animation: `loom-thread 400ms ease-out ${index * 190 + 260}ms forwards`,
                    }}
                  />
                </g>
              )
            })}
          </svg>

          <p className="mt-6 font-display text-2xl tracking-tight text-ink sm:text-3xl">
            Kezia Craft
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ash">Handmade in Africa</p>

          <div className="mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-sweep transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-ash">{progress}%</p>
        </>
      )}

      {showSkip && (
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="mt-6 min-h-[44px] rounded-full border border-line px-5 text-sm font-medium text-ink transition hover:border-primary hover:text-primary"
        >
          Skip loading
        </button>
      )}
    </div>
  )
}
