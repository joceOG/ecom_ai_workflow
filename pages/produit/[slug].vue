<template>
  <div v-if="pending">Chargement...</div>
  <div v-else-if="!product">Produit introuvable</div>
  <div v-else>
    <NuxtLink to="/catalogue" class="btn ghost small">← Retour</NuxtLink>
    <div class="pdp">
      <div><img :src="product.image" :alt="product.name" /></div>
      <div>
        <div><span v-if="product.promo" class="badge promo">Promo</span> <span v-if="product.isNew" class="badge new">Nouveau</span></div>
        <h1>{{ product.name }}</h1>
        <div>★ {{ product.rating }} ({{ product.reviews }} avis) · {{ product.material }}</div>
        <div style="margin:10px 0"><span class="price" style="font-size:26px">{{ fmt(selected?.price || product.price) }}</span><span v-if="selected?.oldPrice" class="old">{{ fmt(selected.oldPrice) }}</span></div>
        <p>{{ product.description }}</p>
        <h4>Taille / Âge + stock live (mock)</h4>
        <div class="sizes">
          <button v-for="v in product.variants" :key="v.sku" class="size" :class="{active: selected?.sku===v.sku, disabled: v.stock===0}" @click="v.stock>0 && (selected=v)">
            {{ v.age }} · {{ v.color }} ({{ v.stock }})
          </button>
        </div>
        <div style="display:flex;gap:8px;margin:14px 0;align-items:center">
          <input v-model.number="qty" type="number" min="1" max="9" style="width:70px;padding:10px;border-radius:10px;border:1px solid var(--line)" />
          <button class="btn" @click="add">Ajouter — Cash à la livraison</button>
        </div>
        <div class="alert">Livraison {{ zoneEta }} · Retour 30j · Échange taille gratuit. <NuxtLink to="/guide-tailles" style="text-decoration:underline">Voir guide</NuxtLink></div>
        <h4>Complète le look</h4>
        <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(140px,1fr))">
          <NuxtLink v-for="r in related" :key="r.slug" :to="`/produit/${r.slug}`" class="card" style="padding:8px;font-size:13px;font-weight:700"><img :src="r.image" style="height:120px" />{{ r.name }}<br/>{{ fmt(r.price) }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fmt, addToCart } = useShop()
const qty = ref(1)
const selected = ref<any>(null)
const { data, pending } = await useFetch(() => `/api/products/${route.params.slug}`)
const product = computed(() => (data.value as any)?.product)
const related = computed(() => (data.value as any)?.related || [])
watch(product, (p) => { if (p) selected.value = p.variants.find((v: any) => v.stock > 0) || p.variants[0] }, { immediate: true })
const zoneEta = '24-48h'
function add() {
  if (!selected.value || selected.value.stock === 0) return alert('Taille en rupture')
  addToCart({ sku: selected.value.sku, slug: product.value.slug, name: product.value.name, age: selected.value.age, color: selected.value.color, price: selected.value.price, image: product.value.image, qty: qty.value })
  navigateTo('/panier')
}
</script>
