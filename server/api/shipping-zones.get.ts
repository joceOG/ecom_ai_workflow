import { SHIPPING_ZONES } from '~~/mocks/catalog'
import { query, isDbConfigured } from '~~/server/utils/db'

export default defineEventHandler(async () => {
  if (!isDbConfigured()) return { zones: SHIPPING_ZONES, source: 'mock' }
  try {
    const zones = await query('SELECT id, name, base_fee, per_kg, free_from, eta FROM shipping_zones ORDER BY base_fee')
    return { zones, source: 'postgres' }
  } catch {
    return { zones: SHIPPING_ZONES, source: 'mock-fallback' }
  }
})
