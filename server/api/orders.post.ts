import { getPool, isDbConfigured } from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const items = Array.isArray(body?.items) ? body.items : []
  const total = Number(body?.total ?? 0)
  const currency = String(body?.currency ?? 'FCFA')
  const name = String(body?.name ?? 'Client')
  const phone = String(body?.phone ?? '')
  const zone = String(body?.zone ?? 'locale')
  const address = String(body?.address ?? '')

  if (!items.length) throw createError({ statusCode: 400, message: 'Panier vide' })

  const number = 'KD-' + Math.floor(100000 + Math.random() * 900000)

  if (!isDbConfigured()) {
    return {
      order: { number, status: 'CONFIRMED_COD', total, currency, name, phone, zone, address, items, eta: '24-48h', message: 'Commande cash enregistrée (mock, sans DB).' },
      source: 'mock',
    }
  }

  const pool = getPool()!
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { rows } = await client.query(
      `INSERT INTO orders (number, status, total, currency, name, phone, zone, address, eta, message)
       VALUES ($1,'CONFIRMED_COD',$2,$3,$4,$5,$6,$7,'24-48h','Commande cash enregistrée. Confirmation par appel/SMS.')
       RETURNING id, number, status, total, currency, name, phone, zone, address, eta, message, created_at`,
      [number, total, currency, name, phone, zone, address]
    )
    const order = rows[0]
    for (const it of items) {
      await client.query(
        'INSERT INTO order_items (order_id, sku, name, qty, price) VALUES ($1,$2,$3,$4,$5)',
        [order.id, String(it.sku || ''), String(it.name || ''), Number(it.qty || 1), Number(it.price || 0)]
      )
      // Décrémente le stock sans passer en négatif
      if (it.sku) {
        await client.query(
          'UPDATE variants SET stock = GREATEST(stock - $2, 0) WHERE sku = $1',
          [String(it.sku), Number(it.qty || 1)]
        )
      }
    }
    await client.query('COMMIT')
    const savedItems = (await client.query('SELECT sku, name, qty, price FROM order_items WHERE order_id = $1', [order.id])).rows
    return { order: { ...order, items: savedItems }, source: 'postgres' }
  } catch (e: any) {
    await client.query('ROLLBACK')
    console.error('[orders] db error:', e.message)
    throw createError({ statusCode: 500, message: 'Erreur enregistrement commande: ' + e.message })
  } finally {
    client.release()
  }
})
