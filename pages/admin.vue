<template>
  <h1>Admin solo (mock)</h1>
  <div class="filters">
    <button class="btn small" :class="tab==='products'?'':'ghost'" @click="tab='products'">Produits</button>
    <button class="btn small" :class="tab==='orders'?'':'ghost'" @click="tab='orders'">Commandes COD</button>
    <button class="btn small" :class="tab==='zones'?'':'ghost'" @click="tab='zones'">Livraison</button>
  </div>
  <div v-if="tab==='products'">
    <table class="table"><thead><tr><th>Produit</th><th>SKU exemple</th><th>Prix</th><th>Stock</th><th>Statut</th></tr></thead>
    <tbody><tr v-for="p in items" :key="p.slug"><td><b>{{ p.name }}</b><br/><span style="color:var(--muted)">{{ p.univers }} · {{ p.category }}</span></td><td>{{ p.variants[0]?.sku }}</td><td>{{ fmt(p.price) }}</td><td>{{ p.variants.reduce((s,v)=>s+v.stock,0) }}</td><td><span class="badge new">Publié (mock)</span></td></tr></tbody></table>
  </div>
  <div v-if="tab==='orders'">
    <table class="table"><thead><tr><th>N°</th><th>Client</th><th>Total cash</th><th>Statut</th><th>Action</th></tr></thead>
    <tbody><tr v-for="o in orders" :key="o.number"><td>{{ o.number }}</td><td>{{ o.name }}</td><td>{{ fmt(o.total) }}</td><td>{{ o.status }}</td><td><button class="btn ghost small" @click="o.status='SHIPPED'">Expédier</button> <button class="btn ghost small" @click="o.status='DELIVERED_PAID'">Encaisser cash</button></td></tr></tbody></table>
  </div>
  <div v-if="tab==='zones'">
    <table class="table"><thead><tr><th>Zone</th><th>Frais</th><th>Franco</th><th>Délai</th></tr></thead>
    <tbody><tr v-for="z in zones" :key="z.id"><td>{{ z.name }}</td><td>{{ fmt(z.base_fee) }}</td><td>{{ fmt(z.free_from) }}</td><td>{{ z.eta }}</td></tr></tbody></table>
  </div>
</template>
<script setup lang="ts">
const { fmt } = useShop()
const tab = ref('products')
const { data } = await useFetch('/api/products')
const items = computed(() => (data.value as any)?.items || [])
const { data: z } = await useFetch('/api/shipping-zones')
const zones = computed(() => (z.value as any)?.zones || [])
const orders = ref([{ number: 'KD-482910', name: 'Fatou D.', total: 36500, status: 'CONFIRMED_COD' }, { number: 'KD-482911', name: 'Jean M.', total: 15000, status: 'PREPARING' }])
</script>
