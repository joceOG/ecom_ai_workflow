export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Mock commande Cash à la livraison
  const number = 'KD-' + Math.floor(100000 + Math.random() * 900000)
  return {
    order: {
      number,
      status: 'CONFIRMED_COD',
      total: body?.total ?? 0,
      currency: body?.currency ?? 'FCFA',
      name: body?.name ?? 'Client test',
      phone: body?.phone ?? '',
      zone: body?.zone ?? 'locale',
      address: body?.address ?? '',
      items: body?.items ?? [],
      eta: '24-48h',
      message: 'Commande cash enregistrée. Confirmation par appel/SMS.'
    }
  }
})
