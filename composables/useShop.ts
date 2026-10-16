import { convert, SYMBOLS } from '~~/mocks/catalog'

export function useShop() {
  const currency = useState<string>('currency', () => 'FCFA')
  if (process.client) {
    const c = localStorage.getItem('currency')
    if (c) currency.value = c
  }
  const fmt = (fcfa: number) => {
    const cur = currency.value || 'FCFA'
    const v = convert(fcfa, cur)
    if (cur === 'FCFA') return v.toLocaleString('fr-FR') + SYMBOLS[cur]
    return v + SYMBOLS[cur]
  }

  const getCart = (): any[] => {
    if (!process.client) return []
    try { return JSON.parse(localStorage.getItem('cart') || '[]') } catch { return [] }
  }
  const saveCart = (cart: any[]) => {
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
  }
  const addToCart = (item: any) => {
    const cart = getCart()
    const k = cart.findIndex((c: any) => c.sku === item.sku)
    if (k >= 0) cart[k].qty += item.qty
    else cart.push(item)
    saveCart(cart)
  }
  const clearCart = () => saveCart([])

  return { currency, fmt, getCart, saveCart, addToCart, clearCart }
}
