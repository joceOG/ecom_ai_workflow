import { PRODUCTS } from '~~/mocks/catalog'

export default defineEventHandler((event) => {
  const q = getQuery(event)
  let list = [...PRODUCTS]
  const search = String(q.q || '').toLowerCase()
  const univers = String(q.univers || '')
  const age = String(q.age || '')
  const maxPrice = Number(q.maxPrice || 0)

  if (search) list = list.filter(p =>
    (p.name + ' ' + p.tags.join(' ') + ' ' + p.category).toLowerCase().includes(search)
  )
  if (univers) list = list.filter(p => p.univers === univers)
  if (age) list = list.filter(p => p.variants.some(v => v.age === age))
  if (maxPrice) list = list.filter(p => p.price <= maxPrice)
  if (q.sort === 'price_asc') list.sort((a, b) => a.price - b.price)
  if (q.sort === 'price_desc') list.sort((a, b) => b.price - a.price)
  if (q.sort === 'rating') list.sort((a, b) => b.rating - a.rating)

  return { total: list.length, items: list }
})
