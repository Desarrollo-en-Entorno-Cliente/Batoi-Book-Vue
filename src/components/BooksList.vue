<script setup>
  import { onMounted, computed } from 'vue'
  // Importamos los stores por separado
  import { booksStore } from '../stores/books'
  import { modulesStore } from '../stores/modules'
  import BookItem from './BookItem.vue'
  
  // --- VARIABLES COMPUTED (Para los totales) ---
  const totalBooks = computed(() => booksStore.books.length)
  
  const totalPrice = computed(() => {
    return booksStore.books.reduce((acc, book) => {
      return acc + parseFloat(book.price || 0)
    }, 0).toFixed(2)
  })
  
  onMounted(() => {
    // Cada store se encarga de cargar sus datos
    booksStore.fetchBooks()
    modulesStore.fetchModules()
  })
  </script>
  
  <template>
    <div id="list-container">
      <h2>Listado de libros</h2>
      
      <div id="list">
        <BookItem 
          v-for="book in booksStore.books" 
          :key="book.id" 
          :book="book" 
        />
      </div>
  
      <div class="totals-container">
        <p>Total de libros listados: <strong>{{ totalBooks }}</strong></p>
        <p>Importe total: <strong>{{ totalPrice }} €</strong></p>
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
  </style>