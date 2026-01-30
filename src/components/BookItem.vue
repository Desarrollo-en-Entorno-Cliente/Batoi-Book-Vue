<script setup>
import { computed } from 'vue'
import { useModulesStore } from '../stores/modules'
import { useBooksStore } from '../stores/books'

const props = defineProps({
  book: { type: Object, required: true }
})

const modulesStore = useModulesStore()
const booksStore = useBooksStore()

const isSold = computed(() => !!props.book.soldDate)

const moduleCode = computed(() => props.book.moduleCode || props.book.idModule)

const moduleName = computed(() => {
  return modulesStore.getModuleName(moduleCode.value)
})

const bookImage = computed(() => {
  return booksStore.getCoverPath(moduleCode.value)
})
</script>

<template>
  <div class="card" :class="{ 'sold-item': isSold }">
    <div class="cover">
      <img :src="bookImage" :alt="`Portada módulo ${moduleCode}`" />
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
  height: 160px;
}
.cover img {
  max-width: 100px;
  max-height: 140px;
  object-fit: cover;
  border-radius: 4px;
}
.sold-item { opacity: 0.75; border: 1px dashed var(--accent-tertiary); background-color: rgba(0, 0, 0, 0.2); }
.line-through { text-decoration: line-through; opacity: 0.6; }
</style>