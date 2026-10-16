<template>
  <h1>Compte (mock local)</h1>
  <div class="grid" style="grid-template-columns:1fr 1fr">
    <div class="card" style="padding:16px">
      <h3>Profil + enfants</h3>
      <input v-model="name" placeholder="Ton nom" style="padding:10px;border-radius:10px;border:1px solid var(--line);width:100%;margin-bottom:8px" />
      <div v-for="(k,i) in kids" :key="i" style="display:flex;gap:6px;margin-bottom:6px">
        <input v-model="k.name" placeholder="Prénom enfant" style="flex:1;padding:8px;border-radius:8px;border:1px solid var(--line)" />
        <select v-model="k.age"><option>0-3M</option><option>2A</option><option>4A</option><option>6A</option><option>8A</option><option>10A</option><option>12A</option></select>
        <button class="btn ghost small" @click="kids.splice(i,1)">x</button>
      </div>
      <button class="btn ghost small" @click="kids.push({name:'',age:'4A'})">+ Ajouter enfant</button>
      <button class="btn" style="margin-top:10px" @click="save">Sauvegarder local</button>
    </div>
    <div class="card" style="padding:16px">
      <h3>Commandes mock</h3>
      <div class="alert">Historique réel viendra de l'API Java. Ici stockage local navigateur.</div>
      <div>Wishlist : <b>{{ wishlist.length }}</b> articles (bouton ♥ sur PDP en V2)</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const name = ref(''); const kids = ref<any[]>([{name:'Aya',age:'4A'}]); const wishlist = ref<any[]>([])
onMounted(() => { name.value = localStorage.getItem('profile_name') || ''; try{ kids.value = JSON.parse(localStorage.getItem('kids')||'[{"name":"Aya","age":"4A"}]')}catch{} })
function save(){ localStorage.setItem('profile_name',name.value); localStorage.setItem('kids',JSON.stringify(kids.value)); alert('Sauvé local (mock)') }
</script>
