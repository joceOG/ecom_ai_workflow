<template>
  <h1>Suivi commande + retours</h1>
  <div class="card" style="padding:16px">
    <div style="display:flex;gap:8px"><input v-model="number" placeholder="N° ex: KD-123456" style="flex:1;padding:10px;" /><button class="btn" @click="track">Suivre</button></div>
    <div v-if="result" class="success" style="margin-top:10px">
      <b>{{ result.number }}</b> — {{ result.status }} · {{ result.eta }}<br/>Cash : {{ fmt(result.total) }} · {{ result.zone }}
      <div style="margin-top:8px">Timeline mock : Confirmée → Préparation → Expédiée → Livrée (payée cash)</div>
      <button class="btn ghost small" style="margin-top:8px" @click="askReturn">Demander retour / échange taille (mock)</button>
    </div>
  </div>
  <div class="alert">Retour 30j gratuit 1x pour échange taille. Remboursement cash ou bon d'achat.</div>
</template>
<script setup lang="ts">
const route = useRoute()
const { fmt } = useShop()
const number = ref(String(route.query.number || 'KD-123456'))
const result = ref<any>(null)
function track() { result.value = { number: number.value, status: 'PREPARING (mock)', total: 25000, zone: 'Domicile locale', eta: '24-48h' } }
function askReturn() { alert('Demande envoyée (mock). Admin te rappelle pour échange.') }
onMounted(() => { if (route.query.number) track() })
</script>
