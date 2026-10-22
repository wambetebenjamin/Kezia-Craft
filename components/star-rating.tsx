import { Star } from 'lucide-react'

export function StarRating({
  rating,
  size = 14,
  showValue = false,
  count,
  className = '',
}: {
  rating: number
  size?: number
  showValue?: boolean
  count?: number
  className?: string
}) {
  const rounded = Math.round(rating * 2) / 2

  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((index) => {
          const filled = rounded >= index
          const half = !filled && rounded >= index - 0.5
          return (
            <Star
              key={index}
              width={size}
              height={size}
              className={
                filled
                  ? 'fill-honey text-honey'
                  : half
                    ? 'fill-honey/50 text-honey'
                    : 'fill-none text-line'
              }
              strokeWidth={1.6}
            />
          )
        })}
      </span>
      {showValue && (
        <span className="text-xs text-body">
          {rating.toFixed(1)}
          {typeof count === 'number' && <span className="text-ash"> ({count})</span>}
        </span>
      )}
    </div>
  )
}
