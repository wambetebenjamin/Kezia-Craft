import Link from 'next/link'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Kezia Craft home">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-sweep text-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          <path d="M8 3v18M16 3v18" strokeLinecap="round" opacity="0.7" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-xl tracking-tight ${light ? 'text-white' : 'text-ink'}`}
        >
          Kezia Craft
        </span>
        <span
          className={`mt-0.5 block text-[10px] uppercase tracking-[0.18em] ${
            light ? 'text-muted' : 'text-ash'
          }`}
        >
          Made in Africa
        </span>
      </span>
    </Link>
  )
}
