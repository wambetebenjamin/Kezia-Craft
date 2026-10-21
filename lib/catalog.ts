import { artisans, products, type Product } from '@/lib/data'

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'rating', label: 'Best rated' },
]

export const PRICE_BANDS = [
  { id: 'under-2000', label: 'Under KES 2,000', min: 0, max: 1999 },
  { id: '2000-5000', label: 'KES 2,000 to 5,000', min: 2000, max: 5000 },
  { id: '5000-10000', label: 'KES 5,000 to 10,000', min: 5001, max: 10000 },
  { id: 'over-10000', label: 'Over KES 10,000', min: 10001, max: Number.MAX_SAFE_INTEGER },
] as const

export type CatalogProduct = Product & { artisanName: string }

export type CatalogFilters = {
  category?: string
  region?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sort?: SortOption
  search?: string
  page?: number
  pageSize?: number
}

export function withArtisan(product: Product): CatalogProduct {
  return {
    ...product,
    artisanName: artisans.find((artisan) => artisan.slug === product.artisanSlug)?.name ?? 'Kezia Craft',
  }
}

export function queryProducts(filters: CatalogFilters) {
  const {
    category,
    region,
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
    minRating = 0,
    sort = 'newest',
    search = '',
    page = 1,
    pageSize = 12,
  } = filters

  const needle = search.trim().toLowerCase()

  const filtered = products
    .map(withArtisan)
    .filter((product) => {
      if (category && category !== 'All' && product.category !== category) return false
      if (region && region !== 'All' && product.region !== region) return false
      if (product.price < minPrice || product.price > maxPrice) return false
      if (minRating && product.rating < minRating) return false
      if (
        needle &&
        !`${product.name} ${product.artisanName} ${product.category}`.toLowerCase().includes(needle)
      ) {
        return false
      }
      return true
    })

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const items = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  return { items, total, page: safePage, pageSize, totalPages }
}

export const filterOptions = {
  categories: ['All', ...Array.from(new Set(products.map((p) => p.category)))],
  regions: ['All', ...Array.from(new Set(products.map((p) => p.region)))],
}
