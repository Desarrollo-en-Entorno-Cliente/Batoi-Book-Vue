<script setup>
  import { computed } from 'vue'
  import { booksStore } from '../stores/books'
  import { modulesStore } from '../stores/modules'
  
  const props = defineProps({
    book: { type: Object, required: true }
  })
  
  const isSold = computed(() => !!props.book.soldDate)
  
  const handleDelete = () => {
    if (confirm(`¿Borrar libro ${props.book.id}?`)) {
      booksStore.removeBook(props.book.id)
    }
  }
</script>

<template>
  <div class="card" :data-id="book.id" :class="{ 'sold-item': isSold }">
    <div class="cover" v-if="book.photo">
      <img :src="'/img/' + book.photo" :alt="'Portada del libro ' + book.id" />
    </div>
    
    <div class="details">
      <h3>{{ modulesStore.getModuleName(book.moduleCode) }} ({{ book.id }})</h3>
      <h4>{{ book.publisher }}</h4>
      <p>{{ book.pages }} páginas</p>
      <p>Estado: {{ book.status }}</p>
      
      <p v-if="isSold" class="sold-text">Vendido el {{ book.soldDate }}</p>
      <p v-else>En venta</p>
      
      <p><i>{{ book.comments }}</i></p>
      
      <h4 v-if="isSold" style="text-decoration: line-through; color: var(--accent-tertiary);">
        {{ parseFloat(book.price).toFixed(2) }} €
      </h4>
      <h4 v-else>{{ parseFloat(book.price).toFixed(2) }} €</h4>
    </div>
    
    <div class="card-actions">
      <button 
        class="icon-button" 
        :class="{ 'disabled-btn': isSold }"
        :disabled="isSold"
        title="Añadir al carrito"
      >
        <span class="material-icons">add_shopping_cart</span>
      </button>
      
      <button 
        class="icon-button" 
        :class="{ 'disabled-btn': isSold }"
        :disabled="isSold"
        title="Editar libro" 
        @click="booksStore.setBookToEdit(book)"
      >
        <span class="material-icons">edit</span>
      </button>
      
      <button 
        class="icon-button" 
        title="Eliminar libro" 
        data-action="delete"
        @click="handleDelete"
      >
        <span class="material-icons">delete</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Estilo para la imagen */
.cover {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.cover img {
  max-width: 100px; /* Ajusta este valor según el tamaño deseado */
  max-height: 140px;
  object-fit: cover;
  border-radius: 4px;
}

.sold-item { opacity: 0.75; border: 1px dashed var(--accent-tertiary); background-color: rgba(0, 0, 0, 0.2); }
.sold-text { color: var(--accent-tertiary); font-weight: bold; }
.disabled-btn { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
</style>