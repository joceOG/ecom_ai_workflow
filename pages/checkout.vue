<template>
  <h1>Checkout — Cash à la livraison</h1>
  <div class="steps"><div class="step active">1. Infos</div><div class="step">2. Livraison</div><div class="step">3. Confirmation</div></div>
  <div v-if="done" class="success">
    <h3>Commande {{ done.number }} confirmée (mock)</h3>
    <p>Total cash : <b>{{ fmt(done.total) }}</b> · {{ done.zone }} · {{ done.eta }}</p>
    <p>{{ done.message }}</p>
    <NuxtLink :to="`/suivi?number=${done.number}`" class="btn">Suivre ma commande</NuxtLink>
  </div>
  <div v-else class="grid" style="grid-template-columns:2fr 1fr">
    <div class="card" style="padding:16px;gap:10px">
      <input v-model="form.name" placeholder="Nom complet" style="padding:10px;border-radius:10px;border:1px solid var(--line)" />
      <input v-model="form.phone" placeholder="Téléphone / WhatsApp" style="padding:10px;border-radius:10px;border:1px solid var(--line)" />
      <select v-model="form.zone" style="padding:10px;border-radius:10px;border:1px solid var(--line)">
        <option v-for="z in zones" :key="z.id" :value="z.id">{{ z.name }} — {{ fmt(z.base_fee) }} · {{ z.eta }}</option>
      </select>
      <textarea v-model="form.address" placeholder="Adresse complète + repère" rows="3" style="padding:10px;border-radius:10px;border:1px solid var(--line)"></textarea>
      <div class="alert">Paiement en espèces à la réception. Aucune carte requise (mock).</div>
      <button class="btn" @click="submit" :disabled="loading">{{ loading ? 'Envoi...' : `Confirmer ${fmt(total)} cash` }}</button>
      <div v-if="error" class="alert">{{ error }}</div>
    </div>
    <div class="card" style="padding:16px;height:fit-content">
      <h3>Récap ({{ count }} articles)</h3>
      <div v-for="i in cart" :key="i.sku" style="font-size:14px">{{ i.qty }}x {{ i.name }} {{ i.age }} — {{ fmt(i.price*i.qty) }}</div>
      <hr/><div>Sous-total {{ fmt(subtotal) }}</div><div>Livraison {{ fmt(ship) }}</div><div><b>Total cash {{ fmt(total) }}</b></div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { fmt, getCart, clearCart } = useShop()
const cart = ref<any[]>([])
const zones = ref<any[]>([])
const form = ref({ name: '', phone: '', zone: 'locale', address: '' })
const loading = ref(false); const error = ref(''); const done = ref<any>(null)
onMounted(async () => {
  cart.value = getCart()
  const r: any = await $fetch('/api/shipping-zones'); zones.value = r.zones
})
const subtotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))
const ship = computed(() => zones.value.find(z => z.id === form.value.zone)?.base_fee || 0)
const total = computed(() => subtotal.value + ship.value)
const count = computed(() => cart.value.reduce((s, i) => s + i.qty, 0))
async function submit() {
  error.value = ''
  if (!form.value.name || !form.value.phone || !form.value.address) { error.value = 'Nom, téléphone et adresse requis (mock).'; return }
  loading.value = true
  try {
    const r: any = await $fetch('/api/orders', { method: 'POST', body: { ...form.value, total: total.value, currency: localStorage.getItem('currency') || 'FCFA', items: cart.value } })
    done.value = r.order; clearCart()
  } catch (e: any) { error.value = 'Erreur mock commande' } finally { loading.value = false }
}
</script>
