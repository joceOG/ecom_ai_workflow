import { queryOne, isDbConfigured } from '~~/server/utils/db'

const FALLBACK: Record<string, any> = {
  KIDS10: { valid: true, type: 'percent', value: 10, label: '-10% avec KIDS10' },
  LIVRAISON: { valid: true, type: 'freeship', value: 0, label: 'Livraison offerte' },
  PACK21: { valid: true, type: 'percent', value: 15, label: '-15% pack (mock 2+1)' },
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const code = String(body?.code || '').toUpperCase().trim()
  if (!code) throw createError({ statusCode: 400, message: 'Code requis' })

  if (isDbConfigured()) {
    try {
      const row = await queryOne('SELECT code, type, value, label, active FROM coupons WHERE code = $1', [code])
      if (row && row.active) return { valid: true, code: row.code, type: row.type, value: Number(row.value), label: row.label, source: 'postgres' }
    } catch (e: any) {
      console.error('[coupon] db error:', e.message)
    }
  }

  const fb = FALLBACK[code]
  if (fb) return { ...fb, code, source: 'mock' }
  throw createError({ statusCode: 400, message: 'Code invalide (essaie KIDS10)' })
})
