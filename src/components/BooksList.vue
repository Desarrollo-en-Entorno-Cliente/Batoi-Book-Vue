<script setup>
import { onMounted, computed } from 'vue'
import { useBooksStore } from '../stores/books'
import { useModulesStore } from '../stores/modules'
import { useCartStore } from '../stores/cart'
import BookItem from './BookItem.vue'

const booksStore = useBooksStore()
const modulesStore = useModulesStore()
const cartStore = useCartStore()

onMounted(async () => {
  // Cargamos datos necesarios al montar el componente
  await modulesStore.fetchModules()
  await booksStore.fetchBooks()
})

const totalBooks = computed(() => booksStore.books.length)
const totalPrice = computed(() => {
  return booksStore.books.reduce((acc, book) => acc + parseFloat(book.price || 0), 0).toFixed(2)
})
</script>

<template>
  <div id="list-container">
    <h2>Listado de libros</h2>
    
    <div id="list" v-if="booksStore.books.length > 0">
      <BookItem v-for="book in booksStore.books" :key="book.id" :book="book">
        <button 
          class="icon-button"
          title="Añadir al carrito"
          @click="cartStore.addBook(book)"
          :disabled="!!book.soldDate || cartStore.hasBook(book.id)"
        >
          <span class="material-icons">add_shopping_cart</span>
        </button>

        <router-link 
          :to="{ name: 'edit-book', params: { id: book.id } }" 
          class="icon-button" 
          v-if="!book.soldDate"
          title="Editar libro"
        >
          <span class="material-icons">edit</span>
        </router-link>

        <button 
          class="icon-button" 
          title="Eliminar libro"
          @click="booksStore.removeBook(book.id)"
        >
          <span class="material-icons">delete</span>
        </button>
      </BookItem>
    </div>
    <div v-else class="loading">Cargando libros...</div>

    <div class="totals-container" v-if="totalBooks > 0">
      <p>Total libros: <strong>{{ totalBooks }}</strong> | Importe: <strong>{{ totalPrice }} €</strong></p>
    </div>
  </div>
</template>
  
  <style scoped>
  .totals-container {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    color: var(--text-mid);
    text-align: right;
    font-size: 1.1rem;
    box-shadow: var(--shadow-dark);
  }
  .totals-container strong {
    color: var(--accent-primary);
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
  .disabled-btn { opacity: 0.3; cursor: not-allowed; }
  </style>