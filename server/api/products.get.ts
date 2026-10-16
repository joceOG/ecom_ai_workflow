import { PRODUCTS } from '~~/mocks/catalog'
import { query, isDbConfigured } from '~~/server/utils/db'

function mapProduct(r: any) {
  return {
    slug: r.slug,
    name: r.name,
    univers: r.univers,
    category: r.category,
    price: Number(r.price),
    oldPrice: r.old_price != null ? Number(r.old_price) : undefined,
    rating: Number(r.rating),
    reviews: Number(r.reviews),
    material: r.material,
    colors: r.colors || [],
    tags: r.tags || [],
    isNew: Boolean(r.is_new),
    promo: Boolean(r.promo),
    image: r.image || '',
    description: r.description || '',
    variants: [],
  }
}

function mapVariant(r: any) {
  return {
    sku: r.sku,
    age: r.age,
    size_cm: r.size_cm,
    shoe: r.shoe,
    color: r.color,
    price: Number(r.price),
    oldPrice: r.old_price != null ? Number(r.old_price) : undefined,
    stock: Number(r.stock),
  }
}

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const search = String(q.q || '').toLowerCase()
  const univers = String(q.univers || '')
  const age = String(q.age || '')
  const maxPrice = Number(q.maxPrice || 0)
  const sort = String(q.sort || '')

  if (!isDbConfigured()) {
    let list = [...PRODUCTS]
    if (search) list = list.filter(p => (p.name + ' ' + p.tags.join(' ') + ' ' + p.category).toLowerCase().includes(search))
    if (univers) list = list.filter(p => p.univers === univers)
    if (age) list = list.filter(p => p.variants.some(v => v.age === age))
    if (maxPrice) list = list.filter(p => p.price <= maxPrice)
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return { total: list.length, items: list, source: 'mock' }
  }

  try {
    const where: string[] = []
    const params: any[] = []
    if (univers) { params.push(univers); where.push(`p.univers = $${params.length}`) }
    if (maxPrice) { params.push(maxPrice); where.push(`p.price <= $${params.length}`) }
    if (search) { params.push(`%${search}%`); where.push(`(LOWER(p.name || ' ' || array_to_string(p.tags,' ') || ' ' || p.category) LIKE $${params.length})`) }
    if (age) { params.push(age); where.push(`EXISTS (SELECT 1 FROM variants v2 WHERE v2.product_slug = p.slug AND v2.age = $${params.length})`) }

    let orderBy = 'p.created_at DESC'
    if (sort === 'price_asc') orderBy = 'p.price ASC'
    if (sort === 'price_desc') orderBy = 'p.price DESC'
    if (sort === 'rating') orderBy = 'p.rating DESC'

    const sql = `SELECT p.* FROM products p ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY ${orderBy} LIMIT 200`
    const rows = await query(sql, params)
    const items = []
    for (const r of rows) {
      const p = mapProduct(r)
      p.variants = (await query('SELECT * FROM variants WHERE product_slug = $1 ORDER BY price', [p.slug])).map(mapVariant)
      items.push(p)
    }
    return { total: items.length, items, source: 'postgres' }
  } catch (e: any) {
    console.error('[products] db error, fallback mock:', e.message)
    return { total: PRODUCTS.length, items: PRODUCTS, source: 'mock-fallback', dbError: e.message }
  }
})
