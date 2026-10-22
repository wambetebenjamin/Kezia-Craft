import { NextResponse, type NextRequest } from 'next/server'
import { queryProducts, SORT_OPTIONS, type SortOption } from '@/lib/catalog'

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const sortParam = params.get('sort') as SortOption | null
  const sort =
    sortParam && SORT_OPTIONS.some((option) => option.value === sortParam) ? sortParam : 'newest'

  const result = queryProducts({
    category: params.get('category')?.trim() ?? undefined,
    region: params.get('region')?.trim() ?? undefined,
    minPrice: Number(params.get('minPrice') ?? 0),
    maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
    minRating: Number(params.get('rating') ?? 0),
    sort,
    search: params.get('q')?.trim() ?? '',
    page: Number(params.get('page') ?? 1) || 1,
    pageSize: Math.min(48, Math.max(1, Number(params.get('limit') ?? 12) || 12)),
  })

  return NextResponse.json(result)
}
