<script setup>
import { reactive, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books'
import { useModulesStore } from '../stores/modules'

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()
const modulesStore = useModulesStore()

const emptyForm = {
  moduleCode: '', publisher: '', price: '', pages: '', 
  status: 'new', comments: '', soldDate: ''
}

const formData = reactive({ ...emptyForm })
const originalData = reactive({})

const isEditing = computed(() => !!route.params.id)
const isModified = computed(() => {
  if (!isEditing.value) return false
  return JSON.stringify(formData) !== JSON.stringify(originalData)
})

const loadBookData = async () => {
  if (isEditing.value) {
    const bookId = route.params.id
    if (booksStore.books.length === 0) await booksStore.fetchBooks()
    
    const bookFound = booksStore.books.find(b => b.id == bookId)
    if (bookFound) {
      formData.moduleCode = bookFound.moduleCode || bookFound.idModule
      formData.publisher = bookFound.publisher
      formData.price = bookFound.price
      formData.pages = bookFound.pages
      formData.status = bookFound.status
      formData.comments = bookFound.comments
      formData.soldDate = bookFound.soldDate
      Object.assign(originalData, JSON.parse(JSON.stringify(formData)))
    } else {
      router.push('/')
    }
  } else {
    Object.assign(formData, emptyForm)
  }
}

onMounted(async () => {
  if (modulesStore.modules.length === 0) await modulesStore.fetchModules()
  await loadBookData()
})

watch(() => route.params.id, () => loadBookData())

const submitForm = async () => {
  const data = { ...formData, idModule: formData.moduleCode }
  if (isEditing.value) {
    await booksStore.updateBook(route.params.id, data)
  } else {
    await booksStore.addBook(data)
  }
  router.push('/')
}

const handleReset = () => {
  if (isEditing.value) {
    isModified.value ? Object.assign(formData, JSON.parse(JSON.stringify(originalData))) : router.push('/')
  } else {
    Object.assign(formData, emptyForm)
  }
}
</script>

<template>
  <div id="form" class="form-container">
    <h2>{{ isEditing ? `Editando Libro ID: ${route.params.id}` : 'Añadir Nuevo Libro' }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label>Módulo</label>
        <select v-model="formData.moduleCode" required>
          <option value="" disabled>- Selecciona un módulo -</option>
          <option v-for="mod in modulesStore.modules" :key="mod.code" :value="mod.code">
            {{ mod.cliteral }}
          </option>
        </select>
      </div>
      <div>
        <label>Editorial</label>
        <input v-model="formData.publisher" type="text" required minlength="3" />
      </div>
      <div>
        <label>Precio</label>
        <input v-model="formData.price" type="number" required step="0.01" />
      </div>
      <div>
        <label>Páginas</label>
        <input v-model="formData.pages" type="number" required />
      </div>
      <div>
        <label>Estado</label>
        <input v-model="formData.status" type="radio" value="new" /> Nuevo
        <input v-model="formData.status" type="radio" value="good" /> Bueno
        <input v-model="formData.status" type="radio" value="bad" /> Malo
      </div>
      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button type="submit" class="btn-primary">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
        <button type="button" @click="handleReset" class="btn-danger">Cancelar/Limpiar</button>
      </div>
    </form>
  </div>
</template>
  
  <style scoped>
  .form-container {
    background-color: var(--bg-card);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-dark);
    border: 1px solid var(--border-color);
  }
  </style>