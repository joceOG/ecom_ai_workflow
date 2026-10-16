import { query, isDbConfigured } from '~~/server/utils/db'

export default defineEventHandler(async () => {
  if (!isDbConfigured()) {
    return { ok: false, db: 'not-configured', hint: 'Définissez DATABASE_URL', time: new Date().toISOString() }
  }
  try {
    const t0 = Date.now()
    const rows = await query('SELECT 1 AS ok, count(*)::int AS products FROM products')
    const orders = await query('SELECT count(*)::int AS c FROM orders')
    return {
      ok: true,
      db: 'postgres',
      latencyMs: Date.now() - t0,
      products: (rows as any[])[0]?.products ?? 0,
      orders: (orders as any[])[0]?.c ?? 0,
      time: new Date().toISOString(),
    }
  } catch (e: any) {
    throw createError({ statusCode: 500, message: 'DB unreachable: ' + e.message })
  }
})
