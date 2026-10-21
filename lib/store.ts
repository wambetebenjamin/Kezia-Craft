/**
 * Optional persistence through Vercel KV. Orders, applications and newsletter
 * signups are written when KV_REST_API_URL and KV_REST_API_TOKEN are present.
 * Without storage configured the routes still respond so the storefront works
 * in preview and local development.
 */
export async function saveRecord(prefix: string, id: string, data: unknown): Promise<boolean> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return false

  try {
    const { kv } = await import('@vercel/kv')
    await kv.set(`${prefix}:${id}`, data)
    return true
  } catch (error) {
    console.error('[kezia-craft:kv] Could not persist record', prefix, error)
    return false
  }
}
