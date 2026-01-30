<script setup>
import { computed } from 'vue'
import { useModulesStore } from '../stores/modules'

const props = defineProps({
  book: { type: Object, required: true }
})

const modulesStore = useModulesStore()

const isSold = computed(() => !!props.book.soldDate)
// Buscamos el nombre del módulo usando el store de módulos
const moduleName = computed(() => {
  const code = props.book.moduleCode || props.book.idModule
  return modulesStore.getModuleName(code)
})
</script>

<template>
  <div class="card" :class="{ 'sold-item': isSold }">
    <div class="cover">
      <img :src="book.photo ? `/img/${book.photo}` : '/img/default.jpg'" alt="Portada" />
    </div>
    <div class="details">
      <h3>ID: {{ book.id }}</h3>
      <h4 class="module-title">{{ moduleName }}</h4>
      <p><strong>Editorial:</strong> {{ book.publisher }}</p>
      <p><strong>Estado:</strong> {{ book.status }} | {{ book.pages }} págs.</p>
      <p v-if="isSold" class="sold-tag">Vendido el {{ book.soldDate }}</p>
      <h4 class="price-tag" :class="{ 'line-through': isSold }">
        {{ parseFloat(book.price).toFixed(2) }} €
      </h4>
    </div>
    <div class="card-actions">
      <slot></slot>
    </div>
  </div>
</template>


<style scoped>
.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.cover img {
  max-width: 100px;
  max-height: 140px;
  object-fit: cover;
  border-radius: 4px;
}

.sold-item { opacity: 0.75; border: 1px dashed var(--accent-tertiary); background-color: rgba(0, 0, 0, 0.2); }
.sold-text { color: var(--accent-tertiary); font-weight: bold; }
.disabled-btn { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
</style>