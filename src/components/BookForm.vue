<script setup>
import { onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books'
import { useModulesStore } from '../stores/modules'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()
const modulesStore = useModulesStore()

const validationSchema = yup.object({
  moduleCode: yup.string()
    .required('El módulo es obligatorio'),
  publisher: yup.string()
    .required('La editorial es obligatoria'),
  price: yup.number()
    .typeError('El precio debe ser un número')
    .required('El precio es obligatorio')
    .min(0, 'El precio debe ser mayor o igual que 0'),
  pages: yup.number()
    .typeError('Las páginas deben ser un número')
    .required('El número de páginas es obligatorio')
    .integer('El número de páginas debe ser un entero')
    .min(0, 'Las páginas deben ser mayor o igual que 0'),
  status: yup.string()
    .required('El estado es obligatorio'),
  comments: yup.string()
    .nullable(),
  soldDate: yup.string()
    .nullable()
})

const { handleSubmit, errors, setValues, defineField, resetForm, values } = useForm({
  validationSchema,
  initialValues: {
    moduleCode: '', 
    publisher: '', 
    price: '', 
    pages: '', 
    status: 'new', 
    comments: '', 
    soldDate: ''
  }
})

// Definición de los campos para v-model (con configuración para validar al cambiar)
const [moduleCode] = defineField('moduleCode')
const [publisher] = defineField('publisher')
const [price] = defineField('price')
const [pages] = defineField('pages')
const [status] = defineField('status')
const [comments] = defineField('comments') // No se valida, pero se gestiona

const isEditing = computed(() => !!route.params.id)

const loadBookData = async () => {
  if (isEditing.value) {
    const bookId = route.params.id
    if (booksStore.books.length === 0) await booksStore.fetchBooks()
    
    const bookFound = booksStore.books.find(b => b.id == bookId)
    if (bookFound) {
      setValues({
        moduleCode: bookFound.moduleCode || bookFound.idModule,
        publisher: bookFound.publisher,
        price: bookFound.price,
        pages: bookFound.pages,
        status: bookFound.status,
        comments: bookFound.comments || '',
        soldDate: bookFound.soldDate || ''
      })
    } else {
      router.push('/')
    }
  } else {
    resetForm()
  }
}

onMounted(async () => {
  if (modulesStore.modules.length === 0) await modulesStore.fetchModules()
  await loadBookData()
})

watch(() => route.params.id, () => loadBookData())

const onSubmit = handleSubmit(async (values) => {
  const data = { ...values, idModule: values.moduleCode }
  
  
  if (isEditing.value) {
    await booksStore.updateBook(route.params.id, data)
  } else {
    await booksStore.addBook(data)
  }
  
  router.push('/')
})

const handleReset = () => {
  if (isEditing.value) {
    loadBookData()
  } else {
    resetForm()
  }
}
</script>

<template>
  <div id="form" class="form-container">
    <h2>{{ isEditing ? `Editando Libro ID: ${route.params.id}` : 'Añadir Nuevo Libro' }}</h2>
    
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Módulo</label>
        <select v-model="moduleCode" :class="{ 'error-input': errors.moduleCode }">
          <option value="" disabled>- Selecciona un módulo -</option>
          <option v-for="mod in modulesStore.modules" :key="mod.code" :value="mod.code">
            {{ mod.cliteral }}
          </option>
        </select>
        <span class="error-msg">{{ errors.moduleCode }}</span>
      </div>

      <div class="form-group">
        <label>Editorial</label>
        <input v-model="publisher" type="text" :class="{ 'error-input': errors.publisher }" />
        <span class="error-msg">{{ errors.publisher }}</span>
      </div>

      <div class="form-group">
        <label>Precio</label>
        <input v-model="price" type="number" step="0.01" :class="{ 'error-input': errors.price }" />
        <span class="error-msg">{{ errors.price }}</span>
      </div>

      <div class="form-group">
        <label>Páginas</label>
        <input v-model="pages" type="number" :class="{ 'error-input': errors.pages }" />
        <span class="error-msg">{{ errors.pages }}</span>
      </div>

      <div class="form-group">
        <label>Estado</label>
        <div>
          <label class="radio-label">
            <input v-model="status" type="radio" value="new" /> Nuevo
          </label>
          <label class="radio-label">
            <input v-model="status" type="radio" value="good" /> Bueno
          </label>
          <label class="radio-label">
            <input v-model="status" type="radio" value="bad" /> Malo
          </label>
        </div>
        <span class="error-msg">{{ errors.status }}</span>
      </div>

      <div class="form-group">
        <label>Comentarios</label>
        <textarea v-model="comments"></textarea>
      </div>

      <div style="display: flex; gap: 10px; margin-top: 20px;">
        <button type="submit" class="btn-primary" :disabled="Object.keys(errors).length > 0">
          {{ isEditing ? 'Actualizar' : 'Guardar' }}
        </button>
        <button type="button" @click="handleReset" class="btn-danger">
          Cancelar/Limpiar
        </button>
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

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.error-input {
  border-color: red;
}

.error-msg {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

.radio-label {
  margin-right: 15px;
  font-weight: normal;
}
</style>