import { query, isDbConfigured } from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!isDbConfigured()) return { orders: [], source: 'mock', total: 0 }
  const q = getQuery(event)
  const limit = Math.min(Number(q.limit || 50), 200)
  try {
    const orders = await query(
      `SELECT o.*, COALESCE(json_agg(json_build_object('sku',i.sku,'name',i.name,'qty',i.qty,'price',i.price)) FILTER (WHERE i.id IS NOT NULL), '[]') AS items
       FROM orders o LEFT JOIN order_items i ON i.order_id = o.id
       GROUP BY o.id ORDER BY o.created_at DESC LIMIT $1`,
      [limit]
    )
    return { orders, total: orders.length, source: 'postgres' }
  } catch (e: any) {
    throw createError({ statusCode: 500, message: e.message })
  }
})
