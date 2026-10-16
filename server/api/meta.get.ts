import { CATEGORIES, SHIPPING_ZONES, SIZE_GUIDE } from '~~/mocks/catalog'

export default defineEventHandler(() => {
  return { categories: CATEGORIES, shippingZones: SHIPPING_ZONES, sizeGuide: SIZE_GUIDE }
})
