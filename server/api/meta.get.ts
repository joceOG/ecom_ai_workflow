import { CATEGORIES, SHIPPING_ZONES, SIZE_GUIDE } from '~~/mocks/catalog'
import { query, isDbConfigured } from '~~/server/utils/db'

export default defineEventHandler(async () => {
  if (!isDbConfigured()) {
    return { categories: CATEGORIES, shippingZones: SHIPPING_ZONES, sizeGuide: SIZE_GUIDE, source: 'mock' }
  }
  try {
    const [cats, zones, guide] = await Promise.all([
      query('SELECT slug, univers, name FROM categories ORDER BY name'),
      query('SELECT id, name, base_fee, per_kg, free_from, eta FROM shipping_zones ORDER BY base_fee'),
      query('SELECT age, cm, poitrine, poids FROM size_guide'),
    ])
    return {
      categories: cats,
      shippingZones: zones,
      sizeGuide: guide,
      source: 'postgres',
    }
  } catch (e: any) {
    return { categories: CATEGORIES, shippingZones: SHIPPING_ZONES, sizeGuide: SIZE_GUIDE, source: 'mock-fallback', dbError: e.message }
  }
})
