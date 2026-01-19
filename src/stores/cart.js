import { reactive, computed, watch } from 'vue'
import { messagesStore } from './messages'
import api from '../services/api'

const storedCart = JSON.parse(localStorage.getItem('batoi_cart')) || []

export const cartStore = reactive({
  cart: storedCart,

  totalItems: computed(() => cartStore.cart.length),
  
  totalPrice: computed(() => {
    return cartStore.cart.reduce((total, book) => total + parseFloat(book.price), 0).toFixed(2)
  }),

  addBook(book) {
    if (this.cart.find(item => item.id === book.id)) {
      messagesStore.addMessage('El libro ya está en el carrito', 'warning')
      return
    }
    this.cart.push(book)
    messagesStore.addMessage('Libro añadido al carrito', 'success')
  },

  removeBook(id) {
    const index = this.cart.findIndex(item => item.id === id)
    if (index !== -1) {
      this.cart.splice(index, 1)
      messagesStore.addMessage('Libro eliminado del carrito', 'info')
    }
  },

  clearCart() {
    this.cart = []
  },

  hasBook(id) {
    return this.cart.some(item => item.id === id)
  },

  async checkout() {
    try {
      const response = await api.buyBooks(this.cart, this.totalPrice)
      messagesStore.addMessage(response.message, 'success')
      this.clearCart()
    } catch (error) {
      messagesStore.addMessage(error.message, 'error')
    }
  }
})

watch(
  () => cartStore.cart,
  (newCart) => {
    localStorage.setItem('batoi_cart', JSON.stringify(newCart))
  },
  { deep: true }
)