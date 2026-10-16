<template>
  <div class="container">
    <!-- HERO : stepped title, two photographs -->
    <section class="hero" aria-label="KidiShop">
      <img class="hero-small-photo drift" src="/img/hero-couture.jpg" width="800" height="500" alt="Mains qui cousent un tissu à pois dans un atelier de confection" />
      <h1 class="hero-line-1 mask"><span>Petits</span></h1>
      <h1 class="hero-line-2 mask second"><span>grands</span></h1>
      <img class="hero-tall-photo" src="/img/cotton-macro.jpg" width="880" height="1100" alt="Capsule de coton en macro, la matière avant le vêtement" fetchpriority="high" />
      <p class="hero-sentence reveal" style="--d:200ms">Des habits de 0 à 20 ans qui suivent la croissance, payés cash à la porte.</p>
      <div class="hero-cta reveal" style="--d:280ms">
        <NuxtLink to="/catalogue" class="btn">Voir le catalogue</NuxtLink>
        <label class="small">Trouve la taille :
          <select v-model="finderAge" aria-label="Choisir un âge">
            <option v-for="r in guide" :key="r.age" :value="r.age">{{ r.age }}</option>
          </select>
          <span v-if="finderRow"> → {{ finderRow.cm }} cm · {{ finderRow.poids }}</span>
        </label>
      </div>
    </section>

    <!-- SHOWCASE : frame run, one lifted -->
    <section aria-label="Les pièces">
      <div class="showcase-side">
        <h2 class="reveal">Huit pièces</h2>
        <NuxtLink to="/catalogue" class="more small reveal" style="--d:80ms">Tout le catalogue →</NuxtLink>
        <p class="showcase-notes reveal" style="--d:160ms">Coton bio pour les bodies. Jean renforcé pour l'école. Chaque tirage porte son prix cash et son stock vivant.</p>
      </div>
      <div class="frames">
        <figure v-for="(p, i) in products" :key="p.slug" class="frame reveal" :class="{lifted: i===1}" :style="`--d:${i*70}ms`">
          <NuxtLink :to="`/produit/${p.slug}`" class="product-block" :class="`tone-${i % 3}`" :aria-label="p.name">
            <span class="pb-name">{{ p.name }}</span>
            <span class="pb-meta">{{ p.variants[0]?.age }} · {{ fmt(p.price) }}</span>
          </NuxtLink>
          <figcaption class="frame-meta"><span>{{ p.name }}</span><span>{{ fmt(p.price) }}</span></figcaption>
        </figure>
      </div>
    </section>

    <!-- LIST : statement, table pushed right -->
    <section aria-label="Le catalogue par âge">
      <h2 class="list-head reveal">Chaque âge a<br />sa coupe exacte</h2>
      <div class="list-grid">
        <img class="list-side-photo reveal" src="/img/cotton-field.jpg" width="880" height="1100" loading="lazy" alt="Champ de coton, la matière première des bodies" />
        <div class="list-table">
          <div class="row-name">Univers</div>
          <div v-for="(c, i) in cats" :key="c.slug" class="trow reveal" :class="{group: i===4}" :style="`--d:${i*60}ms`">
            <span class="kind">{{ c.name }}</span>
            <span>{{ tagline(c.slug) }}</span>
            <NuxtLink :to="`/catalogue?univers=${c.univers}`" class="val">Voir ›</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- PROOF : plain names in columns -->
    <section aria-label="Preuves">
      <div class="proof-grid">
        <h2 class="reveal">Déjà porté</h2>
        <div class="names reveal" style="--d:120ms">
          <div><span class="kindname">Parents</span><br />Fatou · Awa · Mariam<br />Jean · Aïcha · Yann</div>
          <div><span class="kindname">Écoles</span><br />Les Hibiscus<br />Petits Pas<br />Le Baobab</div>
          <div><span class="kindname">Matières</span><br />Coton bio<br />Jean stretch<br />Molleton gratté</div>
          <div><span class="kindname">Promesses</span><br />Cash à la porte<br />Retour 30 jours<br />Taille échangée</div>
        </div>
      </div>
    </section>

    <!-- GALLERY : staggered pairs -->
    <section aria-label="Le monde autour">
      <div class="pair">
        <div><img class="reveal" src="/img/cobbler.jpg" width="1200" height="900" loading="lazy" alt="Cordonnier à l'ouvrage dans son échoppe" /><p class="caption">L'ouvrage main, comme les finitions</p></div>
        <div class="b"><img class="reveal" style="--d:120ms" src="/img/cotton-white.jpg" width="1000" height="800" loading="lazy" alt="Le blanc du coton avant la teinture" /><p class="caption">Le blanc avant la teinture</p></div>
      </div>
      <div class="pair flip">
        <div class="a"><img class="reveal" src="/img/cotton-field.jpg" width="1200" height="800" loading="lazy" alt="La matière première, en plein champ" /><p class="caption">La matière en plein champ</p></div>
        <div class="b"><img class="reveal" style="--d:120ms" src="/img/atelier.jpg" width="800" height="1000" loading="lazy" alt="Atelier de couture, machine et gestes précis" /><p class="caption">L'atelier en gestes précis</p></div>
      </div>
    </section>

    <!-- FAQ -->
    <section aria-label="Questions">
      <h2 class="faq-head reveal">Cash, taille, retour</h2>
      <div class="faq-list">
        <details class="reveal"><summary>On paie vraiment à la porte ?</summary><p>Oui. Tu commandes, on appelle pour confirmer, tu paies en espèces à la réception. Aucune carte demandée.</p></details>
        <details class="reveal" style="--d:60ms"><summary>Et si la taille ne va pas ?</summary><p>Échange gratuit une fois sous 30 jours si le stock le permet. Le guide des tailles donne la correspondance âge, centimètres et poids.</p></details>
        <details class="reveal" style="--d:120ms"><summary>Vous livrez où ?</summary><p>Domicile, point relais ou retrait boutique. Ville locale en 24 à 48h, national en 2 à 4 jours, international en 5 à 10 jours.</p></details>
        <details class="reveal" style="--d:180ms"><summary>Les prix en euros et dollars ?</summary><p>Convertis depuis le FCFA au taux affiché, arrondis proprement. Le total cash final est confirmé à la commande.</p></details>
        <details class="reveal" style="--d:240ms"><summary>Les photos sont les vraies pièces ?</summary><p>Non. Les visuels produits de ce prototype sont des placeholders. Les photos d'ambiance viennent de collections libres et seront remplacées au shoot.</p></details>
        <details class="reveal" style="--d:300ms"><summary>Code promo ?</summary><p>Essaie KIDS10 pour moins 10 pour cent dans le panier. LIVRAISON offre les frais en mock.</p></details>
      </div>
    </section>

    <!-- CTA : last photograph, text beside -->
    <section class="cta" aria-label="Commander">
      <img src="/img/hero-couture.jpg" width="1600" height="1440" loading="lazy" alt="L'atelier coud la rentrée" />
      <div class="cta-text">
        <h2 class="reveal">La rentrée tient en un pack</h2>
        <p class="reveal" style="--d:100ms">Trois pièces, sept mille francs économisés, une seule livraison cash. Le pack rentrée en 6 ou 8 ans.</p>
        <NuxtLink to="/produit/pack-rentree-tenue-complete" class="btn on-light reveal" style="--d:180ms">Voir le pack</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { fmt } = useShop()
const { data: meta } = await useFetch('/api/meta')
const cats = computed(() => (meta.value as any)?.categories || [])
const guide = computed(() => (meta.value as any)?.sizeGuide || [])
const finderAge = ref('4A')
const finderRow = computed(() => guide.value.find((r: any) => r.age === finderAge.value) || guide.value[0])
const { data } = await useFetch('/api/products', { query: { sort: 'rating' } })
const products = computed(() => ((data.value as any)?.items || []).slice(0, 7))
function tagline(slug: string) {
  const m: Record<string, string> = { bebe: 'Bodies et pyjamas', fille: 'Robes et vestes', garcon: 'Jeans et sweats', chaussures: 'Scratch et toile', accessoires: 'Bonnet et sac', packs: 'Lots malins' }
  return m[slug] || 'Voir'
}
</script>
