<script setup>
  import { reactive, onMounted, computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { booksStore } from '../stores/books'
  import { modulesStore } from '../stores/modules'
  
  const route = useRoute()
  const router = useRouter()
  
  const emptyForm = {
    moduleCode: '', publisher: '', price: '', pages: '', 
    status: 'new', comments: '', soldDate: ''
  }
  
  const formData = reactive({ ...emptyForm })
  
  const isEditing = computed(() => !!route.params.id)
  
  const loadBookData = async () => {
    if (isEditing.value) {
      const bookId = route.params.id
      
      if (booksStore.books.length === 0) {
        await booksStore.fetchBooks()
      }
      
      const bookFound = booksStore.books.find(b => b.id == bookId)
      
      if (bookFound) {
        formData.moduleCode = bookFound.idModule
        formData.publisher = bookFound.publisher
        formData.price = bookFound.price
        formData.pages = bookFound.pages
        formData.status = bookFound.status
        formData.comments = bookFound.comments
        formData.soldDate = bookFound.soldDate
      } else {
        console.error("Libro no encontrado")
        router.push('/')
      }
    } else {
      Object.assign(formData, emptyForm)
      formData.status = 'new'
    }
  }
  
  onMounted(async () => {
    if (modulesStore.modules.length === 0) {
      await modulesStore.fetchModules()
    }
    await loadBookData()
  })
  
  watch(() => route.params.id, (newId) => {
      loadBookData()
  })
  
  const submitForm = async () => {
    if (isEditing.value) {
      const bookToUpdate = {
          ...formData,
          idModule: formData.moduleCode
      }
      await booksStore.updateBook(route.params.id, bookToUpdate)
    } else {
      const newBook = { 
          ...formData, 
          userId: 1,
          idModule: formData.moduleCode
      } 
      await booksStore.addBook(newBook)
    }
    router.push('/')
  }
  
  const handleReset = () => {
    if (isEditing.value) {
      router.push('/add-book')
    } else {
      Object.assign(formData, emptyForm)
      formData.status = 'new'
    }
  }
  </script>
  
  <template>
    <div id="form" class="form-container">
      <h2 id="formTitle" style="color:var(--accent-secondary); margin-bottom:1.5rem;">
        {{ isEditing ? `Editando Libro ID: ${route.params.id}` : 'Añadir Nuevo Libro' }}
      </h2>
  
      <form id="bookForm" @submit.prevent="submitForm">
        
        <div>
          <label for="moduleCode">Módulo</label>
          <select v-model="formData.moduleCode" id="moduleCode" required>
            <option value="" disabled>- Selecciona un módulo -</option>
            <option v-for="mod in modulesStore.modules" :key="mod.code" :value="mod.code">
              {{ mod.cliteral }}
            </option>
          </select>
        </div>
  
        <div>
          <label for="publisher">Editorial</label>
          <input v-model="formData.publisher" type="text" id="publisher" required minlength="3" />
        </div>
  
        <div>
          <label for="price">Precio</label>
          <input v-model="formData.price" type="number" id="price" required min="0" step="0.01" />
        </div>
  
        <div>
          <label for="pages">Páginas</label>
          <input v-model="formData.pages" type="number" id="pages" required min="1" />
        </div>
  
        <div>
          <label>Estado</label>
          <input v-model="formData.status" type="radio" id="status-new" value="new" />
          <label for="status-new" style="display:inline; margin-right:15px">Nuevo</label>
          
          <input v-model="formData.status" type="radio" id="status-good" value="good" />
          <label for="status-good" style="display:inline; margin-right:15px">Bueno</label>
          
          <input v-model="formData.status" type="radio" id="status-bad" value="bad" />
          <label for="status-bad" style="display:inline">Malo</label>
        </div>
  
        <div>
          <label for="comments">Comentarios</label>
          <textarea v-model="formData.comments" id="comments"></textarea>
        </div>
  
        <div style="display: flex; gap: 10px;">
          <button type="submit">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
          
          <button type="button" @click="handleReset" style="background:transparent; border: 1px solid var(--text-mid); color: var(--text-mid)">
            {{ isEditing ? 'Cancelar' : 'Limpiar' }}
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
  </style>