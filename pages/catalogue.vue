<template>
  <h1>Catalogue (mock API)</h1>
  <p style="color:var(--muted)">Filtres par univers, âge, recherche, tri. Essaie code <b>KIDS10</b> dans le panier.</p>
  <div class="filters">
    <input v-model="q" placeholder="Recherche..." @input="refresh" />
    <select v-model="univers" @change="refresh"><option value="">Tous univers</option><option value="bebe">Bébé</option><option value="fille">Fille</option><option value="garcon">Garçon</option><option value="chaussures">Chaussures</option><option value="packs">Packs</option></select>
    <select v-model="age" @change="refresh"><option value="">Tous âges</option><option>0-3M</option><option>2A</option><option>4A</option><option>6A</option><option>8A</option><option>10A</option><option>12A</option><option>14A</option></select>
    <select v-model="sort" @change="refresh"><option value="">Tri</option><option value="price_asc">Prix croissant</option><option value="price_desc">Prix décroissant</option><option value="rating">Mieux notés</option></select>
  </div>
  <div v-if="pending">Chargement...</div>
  <div v-else class="grid products">
    <div v-for="(p, idx) in items" :key="p.slug" class="card">
      <NuxtLink :to="`/produit/${p.slug}`" class="product-block card-visual" :class="`tone-${idx % 3}`" :aria-label="p.name">
        <span class="pb-name">{{ p.name }}</span>
        <span class="pb-meta">{{ p.variants[0]?.age }} · {{ fmt(p.price) }}</span>
      </NuxtLink>
      <div class="card-body">
        <div><span v-if="p.promo" class="badge promo">-{{ Math.round((1-p.price/(p.oldPrice||p.price))*100) }}%</span> <span style="font-size:12px;color:var(--muted)">{{ p.category }}</span></div>
        <NuxtLink :to="`/produit/${p.slug}`" style="font-weight:800">{{ p.name }}</NuxtLink>
        <div><span class="price">{{ fmt(p.price) }}</span><span v-if="p.oldPrice" class="old">{{ fmt(p.oldPrice) }}</span></div>
        <button class="btn ghost small" @click="quickAdd(p)">Ajout rapide 1ère taille dispo</button>
      </div>
    </div>
  </div>
  <div v-if="!pending && items.length===0" class="alert">Aucun produit avec ces filtres (mock).</div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fmt, addToCart } = useShop()
const q = ref(String(route.query.q || ''))
const univers = ref(String(route.query.univers || ''))
const age = ref('')
const sort = ref('')
const { data, pending, refresh } = await useFetch('/api/products', {
  query: computed(() => ({ q: q.value, univers: univers.value, age: age.value, sort: sort.value }))
})
const items = computed(() => (data.value as any)?.items || [])
function quickAdd(p: any) {
  const v = p.variants.find((x: any) => x.stock > 0)
  if (!v) return alert('Rupture mock')
  addToCart({ sku: v.sku, slug: p.slug, name: p.name, age: v.age, color: v.color, price: v.price, image: p.image, qty: 1 })
  navigateTo('/panier')
}
</script>
