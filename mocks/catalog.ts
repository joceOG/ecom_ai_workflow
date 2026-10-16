// Mock central — remplace la future API Java Spring Boot
export const RATES: Record<string, number> = { FCFA: 1, EUR: 0.00152, USD: 0.00165 }
export const SYMBOLS: Record<string, string> = { FCFA: ' FCFA', EUR: ' €', USD: ' $' }

export function convert(baseFCFA: number, currency: string) {
  const r = RATES[currency] ?? 1
  const v = baseFCFA * r
  if (currency === 'FCFA') return Math.round(v / 100) * 100
  return Math.round(v * 100) / 100
}

export const CATEGORIES = [
  { slug: 'bebe', univers: 'bebe', name: 'Bébé 0-24M' },
  { slug: 'fille', univers: 'fille', name: 'Fille 2-16A' },
  { slug: 'garcon', univers: 'garcon', name: 'Garçon 2-16A' },
  { slug: 'chaussures', univers: 'chaussures', name: 'Chaussures 16-42' },
  { slug: 'accessoires', univers: 'accessoires', name: 'Accessoires' },
  { slug: 'packs', univers: 'packs', name: 'Packs & Lots' },
]

export type Variant = { sku: string; age: string; size_cm?: string; shoe?: string; color: string; price: number; oldPrice?: number; stock: number }
export type Product = {
  slug: string; name: string; univers: string; category: string;
  price: number; oldPrice?: number; rating: number; reviews: number;
  material: string; colors: string[]; tags: string[]; isNew?: boolean; promo?: boolean;
  image: string; description: string; variants: Variant[]
}

// Photos produits : shoot en attente. `image` reste vide et l'UI rend des
// aplats typographiques honnêtes. Dépose les vraies photos dans public/img/
// et renseigne `image: '/img/robe-fleurie.jpg'` + public/img/CREDITS.md.
const img = (_seed: string) => ''

export const PRODUCTS: Product[] = [
  {
    slug: 'robe-fleurie-4-ans', name: 'Robe fleurie 4 ans', univers: 'fille', category: 'Robes',
    price: 8500, oldPrice: 12000, rating: 4.6, reviews: 42, material: 'Coton bio', colors: ['Rose', 'Blanc'], tags: ['robe', 'fille', 'ete'],
    isNew: false, promo: true, image: img('robe4a'),
    description: 'Robe légère coton bio, parfaite été et cérémonies. Taille grand, prendre taille habituelle.',
    variants: [
      { sku: 'ROBE4A-R-2A', age: '2A', size_cm: '92', color: 'Rose', price: 8500, oldPrice: 12000, stock: 12 },
      { sku: 'ROBE4A-R-4A', age: '4A', size_cm: '104', color: 'Rose', price: 8500, oldPrice: 12000, stock: 5 },
      { sku: 'ROBE4A-R-6A', age: '6A', size_cm: '116', color: 'Rose', price: 8900, stock: 0 },
    ]
  },
  {
    slug: 'lot-3-bodies-naissance', name: 'Lot 3 bodies naissance', univers: 'bebe', category: 'Bodies',
    price: 9500, rating: 4.9, reviews: 128, material: 'Coton bio', colors: ['Blanc', 'Beige'], tags: ['body', 'bebe', 'lot', 'naissance'],
    isNew: true, image: img('bodies'),
    description: 'Lot de 3 bodies manches longues, boutons pression sans nickel.',
    variants: [
      { sku: 'BODY-0M', age: '0-3M', size_cm: '62', color: 'Blanc', price: 9500, stock: 30 },
      { sku: 'BODY-6M', age: '3-6M', size_cm: '68', color: 'Beige', price: 9500, stock: 22 },
    ]
  },
  {
    slug: 'pantalon-garcon-8-ans', name: 'Pantalon garçon 8 ans', univers: 'garcon', category: 'Pantalons',
    price: 11000, rating: 4.4, reviews: 19, material: 'Jean stretch', colors: ['Bleu'], tags: ['pantalon', 'garcon', 'jean'],
    image: img('pantalon8a'),
    description: 'Jean résistant genoux renforcés, taille ajustable.',
    variants: [
      { sku: 'PANT-6A', age: '6A', size_cm: '116', color: 'Bleu', price: 10500, stock: 8 },
      { sku: 'PANT-8A', age: '8A', size_cm: '128', color: 'Bleu', price: 11000, stock: 14 },
      { sku: 'PANT-10A', age: '10A', size_cm: '140', color: 'Bleu', price: 11500, stock: 3 },
    ]
  },
  {
    slug: 'baskets-enfant-32', name: 'Baskets enfant', univers: 'chaussures', category: 'Baskets',
    price: 15000, oldPrice: 18000, rating: 4.7, reviews: 63, material: 'Toile + gomme', colors: ['Blanc', 'Marine'], tags: ['basket', 'chaussure', 'sport'],
    promo: true, image: img('basket'),
    description: 'Baskets scratch, semelle antidérapante, du 28 au 38.',
    variants: [
      { sku: 'BSK-30', age: '6A', shoe: '30', color: 'Blanc', price: 15000, oldPrice: 18000, stock: 9 },
      { sku: 'BSK-32', age: '8A', shoe: '32', color: 'Blanc', price: 15000, oldPrice: 18000, stock: 6 },
      { sku: 'BSK-34', age: '10A', shoe: '34', color: 'Marine', price: 15500, stock: 0 },
    ]
  },
  {
    slug: 'sweat-capuche-mixte-12-ans', name: 'Sweat capuche mixte 12 ans', univers: 'garcon', category: 'Sweats',
    price: 12500, rating: 4.8, reviews: 31, material: 'Molleton gratté', colors: ['Gris', 'Vert'], tags: ['sweat', 'mixte', 'hiver'],
    isNew: true, image: img('sweat12a'),
    description: 'Sweat chaud, poche kangourou, aussi en taille Young S/M.',
    variants: [
      { sku: 'SWT-10A', age: '10A', size_cm: '140', color: 'Gris', price: 12000, stock: 11 },
      { sku: 'SWT-12A', age: '12A', size_cm: '152', color: 'Gris', price: 12500, stock: 7 },
      { sku: 'SWT-YM', age: 'Young M', size_cm: '170', color: 'Vert', price: 13500, stock: 4 },
    ]
  },
  {
    slug: 'pack-rentree-tenue-complete', name: 'Pack rentrée tenue complète', univers: 'packs', category: 'Packs',
    price: 25000, oldPrice: 32000, rating: 5.0, reviews: 12, material: 'Coton + jean', colors: ['Mix'], tags: ['pack', 'rentree', 'lot'],
    promo: true, image: img('packrentree'),
    description: 'Pack 3 pièces : t-shirt x2 + pantalon + chaussettes. Économise 7000 FCFA.',
    variants: [
      { sku: 'PACK-6A', age: '6A', size_cm: '116', color: 'Mix', price: 25000, oldPrice: 32000, stock: 10 },
      { sku: 'PACK-8A', age: '8A', size_cm: '128', color: 'Mix', price: 25500, oldPrice: 32500, stock: 8 },
    ]
  },
  {
    slug: 'pyjama-bebe-12-mois', name: 'Pyjama bébé 12 mois', univers: 'bebe', category: 'Pyjamas',
    price: 6500, rating: 4.5, reviews: 27, material: 'Velours', colors: ['Jaune'], tags: ['pyjama', 'bebe'],
    image: img('pyjama12m'),
    description: 'Pyjama velours ouverture devant, pieds antidérapants.',
    variants: [
      { sku: 'PYJ-6M', age: '3-6M', size_cm: '68', color: 'Jaune', price: 6000, stock: 15 },
      { sku: 'PYJ-12M', age: '12M', size_cm: '80', color: 'Jaune', price: 6500, stock: 18 },
    ]
  },
  {
    slug: 'doudoune-junior-14-ans', name: 'Doudoune junior 14 ans', univers: 'fille', category: 'Vestes',
    price: 28000, rating: 4.3, reviews: 9, material: 'Polyester recyclé', colors: ['Noir', 'Rose'], tags: ['doudoune', 'hiver', 'veste'],
    image: img('doudoune14a'),
    description: 'Doudoune chaude -5°C, capuche amovible, aussi Young.',
    variants: [
      { sku: 'DOU-12A', age: '12A', size_cm: '152', color: 'Noir', price: 27000, stock: 5 },
      { sku: 'DOU-14A', age: '14A', size_cm: '164', color: 'Noir', price: 28000, stock: 6 },
    ]
  },
]

export const SHIPPING_ZONES = [
  { id: 'locale', name: 'Ville locale (Dakar)', base_fee: 1500, per_kg: 0, free_from: 50000, eta: '24-48h' },
  { id: 'nationale', name: 'Nationale', base_fee: 2500, per_kg: 500, free_from: 80000, eta: '2-4j' },
  { id: 'inter', name: 'International', base_fee: 9000, per_kg: 2500, free_from: 150000, eta: '5-10j' },
  { id: 'relais', name: 'Point relais', base_fee: 1000, per_kg: 0, free_from: 50000, eta: '48h' },
  { id: 'retrait', name: 'Retrait boutique', base_fee: 0, per_kg: 0, free_from: 0, eta: 'Prêt en 2h' },
]

export const SIZE_GUIDE = [
  { age: '0-3M', cm: '62', poitrine: '40', poids: '3-6kg' },
  { age: '3-6M', cm: '68', poitrine: '44', poids: '6-8kg' },
  { age: '12M', cm: '80', poitrine: '48', poids: '9-10kg' },
  { age: '24M', cm: '92', poitrine: '52', poids: '11-13kg' },
  { age: '2A', cm: '92', poitrine: '54', poids: '13kg' },
  { age: '4A', cm: '104', poitrine: '58', poids: '17kg' },
  { age: '6A', cm: '116', poitrine: '62', poids: '21kg' },
  { age: '8A', cm: '128', poitrine: '66', poids: '26kg' },
  { age: '10A', cm: '140', poitrine: '70', poids: '32kg' },
  { age: '12A', cm: '152', poitrine: '76', poids: '40kg' },
  { age: '14A', cm: '164', poitrine: '82', poids: '50kg' },
  { age: '16A', cm: '176', poitrine: '88', poids: '60kg' },
]
