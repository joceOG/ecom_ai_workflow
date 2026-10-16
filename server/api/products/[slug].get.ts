import { PRODUCTS } from '~~/mocks/catalog'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const p = PRODUCTS.find(x => x.slug === slug)
  if (!p) throw createError({ statusCode: 404, message: 'Produit introuvable (mock)' })
  const related = PRODUCTS.filter(x => x.slug !== slug && x.univers === p.univers).slice(0, 3)
  return { product: p, related }
})
