<template>
  <h1>Guide des tailles 0-20 ans</h1>
  <p>Mesures mock à valider avec ton sourcing.</p>
  <table class="table"><thead><tr><th>Âge</th><th>Taille cm</th><th>Poitrine</th><th>Poids</th></tr></thead>
  <tbody><tr v-for="r in guide" :key="r.age"><td><b>{{ r.age }}</b></td><td>{{ r.cm }}</td><td>{{ r.poitrine }}</td><td>{{ r.poids }}</td></tr></tbody></table>
  <div class="alert">Astuce : si entre 2 tailles, prends la plus grande. Chaussures : +0.5cm marge. Avis clients "taille petit/grand" sur chaque fiche.</div>
</template>
<script setup lang="ts">
const { data } = await useFetch('/api/meta')
const guide = computed(() => (data.value as any)?.sizeGuide || [])
</script>
