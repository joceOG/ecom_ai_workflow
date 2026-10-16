export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const code = String(body?.code || '').toUpperCase().trim()
  // Mocks: KIDS10 = -10%, LIVRAISON = livraison offerte, PACK21 = 2+1 simulé -15%
  if (code === 'KIDS10') return { valid: true, code, type: 'percent', value: 10, label: '-10% avec KIDS10' }
  if (code === 'LIVRAISON') return { valid: true, code, type: 'freeship', value: 0, label: 'Livraison offerte' }
  if (code === 'PACK21') return { valid: true, code, type: 'percent', value: 15, label: '-15% pack (mock 2+1)' }
  throw createError({ statusCode: 400, message: 'Code invalide (essaie KIDS10)' })
})
