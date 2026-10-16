<template>
  <div class="topbar">
    <div class="container">
      <div>Cash à la livraison · Retour 30 jours · Échange taille gratuit</div>
      <div style="display:flex;gap:8px;align-items:center">
        <select v-model="locale" @change="setLocale" aria-label="Langue">
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
        <select v-model="currency" @change="setCurrency" aria-label="Devise">
          <option value="FCFA">FCFA</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>
    </div>
  </div>
  <header class="site-head">
    <div class="container">
      <nav class="nav" aria-label="Principal">
        <NuxtLink to="/catalogue">Catalogue</NuxtLink>
        <NuxtLink to="/guide-tailles">Tailles</NuxtLink>
        <NuxtLink to="/suivi">Suivi</NuxtLink>
      </nav>
      <NuxtLink to="/" class="wordmark">KidiShop</NuxtLink>
      <div class="head-action">
        <div class="search">
          <input v-model="q" :placeholder="locale==='fr'?'Rechercher...':'Search...'" @keyup.enter="goSearch" aria-label="Recherche" />
        </div>
        <NuxtLink to="/panier" class="btn small">Panier ({{ cartCount }})</NuxtLink>
      </div>
    </div>
  </header>
  <main>
    <NuxtPage />
  </main>
  <footer class="site-footer">
    <div class="foot-cols">
      <div><strong>KidiShop</strong><span>Douala · Dakar · Abidjan<br />Bébé au jeune adulte, 0 à 20 ans</span></div>
      <div><strong>Acheter</strong><span><NuxtLink to="/catalogue">Catalogue</NuxtLink><br /><NuxtLink to="/guide-tailles">Guide des tailles</NuxtLink><br /><NuxtLink to="/suivi">Livraison et retours</NuxtLink></span></div>
      <div><strong>Compte</strong><span><NuxtLink to="/compte">Profils enfants</NuxtLink><br /><NuxtLink to="/panier">Panier</NuxtLink><br /><NuxtLink to="/admin">Admin</NuxtLink></span></div>
      <div><strong>Cash</strong><span>Paiement à la réception<br />Confirmation par appel ou SMS<br /> International FCFA EUR USD</span></div>
    </div>
    <div></div>
    <div>
      <p class="wordmark-big">KidiShop</p>
      <div class="legal">© 2026 KidiShop · Prototype avec mocks API · Ambiance : Sonneveld, Zanon, Brown, Rose, Shield, de Groot, Marchand via Unsplash · Produits : visuels en attente du shoot</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const q = ref('')
const locale = useState('locale', () => 'fr')
const currency = useState('currency', () => 'FCFA')
const cartCount = useState('cartCount', () => 0)

function setLocale() { localStorage.setItem('locale', locale.value) }
function setCurrency() { localStorage.setItem('currency', currency.value) }
function goSearch() { navigateTo({ path: '/catalogue', query: { q: q.value } }) }

onMounted(() => {
  locale.value = localStorage.getItem('locale') || 'fr'
  currency.value = localStorage.getItem('currency') || 'FCFA'
  updateCount()
  window.addEventListener('cart-updated', updateCount)
})
function updateCount() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cartCount.value = cart.reduce((s: number, i: any) => s + i.qty, 0)
  } catch { cartCount.value = 0 }
}
</script>
