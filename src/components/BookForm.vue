<script setup>
  import { reactive, watch } from 'vue'
  import { booksStore } from '../stores/books'
  import { modulesStore } from '../stores/modules'
  
  const emptyForm = {
    moduleCode: '', publisher: '', price: '', pages: '', 
    status: 'new', comments: '', soldDate: ''
  }
  
  const formData = reactive({ ...emptyForm })
  
  // Vigilamos booksStore para saber si editamos
  watch(() => booksStore.bookToEdit, (newVal) => {
    if (newVal) {
      Object.assign(formData, newVal)
    } else {
      Object.assign(formData, emptyForm)
    }
  })
  
  const submitForm = () => {
    if (booksStore.bookToEdit) {
      booksStore.updateBook(booksStore.bookToEdit.id, { ...formData })
    } else {
      const newBook = { ...formData, userId: 1 } 
      booksStore.addBook(newBook)
    }
    resetForm()
  }
  
  const resetForm = () => {
    booksStore.clearBookToEdit()
    Object.assign(formData, emptyForm)
    formData.status = 'new'
  }
  </script>
  
  <template>
    <div id="form">
      <h2 id="formTitle" style="color:var(--accent-secondary); margin-bottom:1.5rem;">
        {{ booksStore.bookToEdit ? `Editando Libro ID: ${booksStore.bookToEdit.id}` : 'Añadir Nuevo Libro' }}
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
          <button type="submit">{{ booksStore.bookToEdit ? 'Actualizar' : 'Guardar' }}</button>
          <button type="button" @click="resetForm" style="background:transparent; border: 1px solid var(--text-mid); color: var(--text-mid)">
            {{ booksStore.bookToEdit ? 'Cancelar' : 'Limpiar' }}
          </button>
        </div>
      </form>
    </div>
  </template>