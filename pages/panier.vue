<template>
  <h1>Panier</h1>
  <div v-if="cart.length===0" class="alert">Panier vide. <NuxtLink to="/catalogue" style="text-decoration:underline">Voir catalogue</NuxtLink></div>
  <div v-else class="grid" style="grid-template-columns:2fr 1fr">
    <div>
      <div v-for="(i,idx) in cart" :key="i.sku" class="card" style="flex-direction:row;margin-bottom:10px">
        <img :src="i.image" style="width:90px;height:90px" />
        <div class="card-body" style="flex:1">
          <b>{{ i.name }} — {{ i.age }} · {{ i.color }}</b>
          <div>{{ fmt(i.price) }} x <input v-model.number="i.qty" type="number" min="1" max="9" style="width:60px" @change="save" /> = <b>{{ fmt(i.price*i.qty) }}</b></div>
          <button class="btn ghost small" @click="remove(idx)">Retirer</button>
        </div>
      </div>
    </div>
    <div class="card" style="padding:16px;height:fit-content">
      <h3>Total</h3>
      <div>Sous-total : <b>{{ fmt(subtotal) }}</b></div>
      <div style="display:flex;gap:6px;margin:8px 0"><input v-model="code" placeholder="Code KIDS10" style="flex:1;padding:8px;border-radius:8px;border:1px solid var(--line)" /><button class="btn small" @click="apply">OK</button></div>
      <div v-if="coupon" class="success">{{ coupon.label }}</div>
      <div v-if="couponError" class="alert">{{ couponError }}</div>
      <div>Remise : <b>-{{ fmt(discount) }}</b></div>
      <div>Total à payer cash : <b>{{ fmt(total) }}</b></div>
      <NuxtLink to="/checkout" class="btn" style="margin-top:10px;display:block;text-align:center">Commander cash</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const { fmt, getCart, saveCart } = useShop()
const cart = ref<any[]>([])
const code = ref('')
const coupon = ref<any>(null)
const couponError = ref('')
onMounted(() => { cart.value = getCart() })
const subtotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))
const discount = computed(() => coupon.value?.type === 'percent' ? Math.round(subtotal.value * coupon.value.value / 100) : 0)
const total = computed(() => subtotal.value - discount.value)
function save() { saveCart(cart.value) }
function remove(idx: number) { cart.value.splice(idx, 1); save() }
async function apply() {
  couponError.value = ''
  try {
    const r: any = await $fetch('/api/coupons/validate', { method: 'POST', body: { code: code.value } })
    coupon.value = r
    localStorage.setItem('coupon', JSON.stringify(r))
  } catch (e: any) { couponError.value = e?.data?.message || 'Code invalide' }
}
onMounted(() => { try { coupon.value = JSON.parse(localStorage.getItem('coupon') || 'null') } catch {} })
</script>
