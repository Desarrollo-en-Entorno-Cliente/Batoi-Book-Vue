<script setup>
  import { onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { booksStore } from '../stores/books'
  import { modulesStore } from '../stores/modules'
  import BookItem from './BookItem.vue'
  
  const router = useRouter()
  
  const totalBooks = computed(() => booksStore.books.length)
  
  const totalPrice = computed(() => {
    return booksStore.books.reduce((acc, book) => {
      return acc + parseFloat(book.price || 0)
    }, 0).toFixed(2)
  })
  
  onMounted(() => {
    booksStore.fetchBooks()
    modulesStore.fetchModules()
  })
  
  const handleEdit = (id) => {
    router.push({ name: 'edit-book', params: { id } })
  }
  </script>
  
  <template>
    <div id="list-container">
      <h2>Listado de libros</h2>
      
      <div id="list">
        <BookItem 
          v-for="book in booksStore.books" 
          :key="book.id" 
          :book="book"
        >
          <template #actions>
              <button @click="handleEdit(book.id)">Editar</button>
              <button @click="booksStore.removeBook(book.id)">Borrar</button>
          </template>
        </BookItem>
        
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