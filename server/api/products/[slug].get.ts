import { PRODUCTS } from '~~/mocks/catalog'
import { query, queryOne, isDbConfigured } from '~~/server/utils/db'

const mapP = (r: any) => ({
  slug: r.slug, name: r.name, univers: r.univers, category: r.category,
  price: Number(r.price), oldPrice: r.old_price != null ? Number(r.old_price) : undefined,
  rating: Number(r.rating), reviews: Number(r.reviews), material: r.material,
  colors: r.colors || [], tags: r.tags || [], isNew: Boolean(r.is_new),
  promo: Boolean(r.promo), image: r.image || '', description: r.description || '',
})
const mapV = (r: any) => ({
  sku: r.sku, age: r.age, size_cm: r.size_cm, shoe: r.shoe, color: r.color,
  price: Number(r.price), oldPrice: r.old_price != null ? Number(r.old_price) : undefined,
  stock: Number(r.stock),
})

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!isDbConfigured()) {
    const p = PRODUCTS.find(x => x.slug === slug)
    if (!p) throw createError({ statusCode: 404, message: 'Produit introuvable (mock)' })
    const related = PRODUCTS.filter(x => x.slug !== slug && x.univers === p.univers).slice(0, 3)
    return { product: p, related, source: 'mock' }
  }

  try {
    const row = await queryOne('SELECT * FROM products WHERE slug = $1', [slug])
    if (!row) throw createError({ statusCode: 404, message: 'Produit introuvable' })
    const product: any = mapP(row)
    product.variants = (await query('SELECT * FROM variants WHERE product_slug = $1 ORDER BY price', [slug])).map(mapV)
    const rel = await query('SELECT * FROM products WHERE univers = $1 AND slug != $2 LIMIT 3', [product.univers, slug])
    return { product, related: rel.map(mapP), source: 'postgres' }
  } catch (e: any) {
    if (e.statusCode === 404) throw e
    console.error('[product slug] db error:', e.message)
    const p = PRODUCTS.find(x => x.slug === slug)
    if (!p) throw createError({ statusCode: 404, message: 'Produit introuvable' })
    return { product: p, related: [], source: 'mock-fallback' }
  }
})
