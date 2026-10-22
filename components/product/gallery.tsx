'use client'

import Image from 'next/image'
import { useState } from 'react'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const gallery = images.length ? images : ['/images/placeholder.jpg']

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-mist">
        {gallery.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${name}, view ${index + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 640px"
            priority={index === 0}
            aria-hidden={index !== active}
            className={`object-cover transition-opacity duration-500 ease-out ${
              index === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="Product image thumbnails">
        {gallery.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1} of ${gallery.length}`}
            aria-pressed={index === active}
            className={`relative h-16 w-20 min-h-[44px] shrink-0 overflow-hidden rounded-md border-2 transition sm:h-20 sm:w-24 ${
              index === active ? 'border-primary' : 'border-transparent hover:border-line'
            }`}
          >
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
