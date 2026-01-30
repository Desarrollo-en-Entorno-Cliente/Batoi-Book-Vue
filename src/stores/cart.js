import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useMessagesStore } from './messages'
import api from '../services/api'

export const useCartStore = defineStore('cart', () => {
  const messagesStore = useMessagesStore()
  const cart = ref(JSON.parse(localStorage.getItem('batoi_cart')) || [])

  const totalItems = computed(() => cart.value.length)
  
  const totalPrice = computed(() => {
    return cart.value.reduce((total, book) => total + parseFloat(book.price), 0).toFixed(2)
  })

  function addBook(book) {
    if (cart.value.find(item => item.id === book.id)) {
      messagesStore.addMessage('El libro ya está en el carrito', 'warning')
      return
    }
    cart.value.push(book)
    messagesStore.addMessage('Libro añadido al carrito', 'success')
  }

  function removeBook(id) {
    const index = cart.value.findIndex(item => item.id === id)
    if (index !== -1) {
      cart.value.splice(index, 1)
      messagesStore.addMessage('Libro eliminado del carrito', 'info')
    }
  }

  function clearCart() {
    cart.value = []
  }

  function hasBook(id) {
    return cart.value.some(item => item.id === id)
  }

  async function checkout() {
    try {
      const response = await api.buyBooks(cart.value, totalPrice.value)
      messagesStore.addMessage(response.message, 'success')
      clearCart()
    } catch (error) {
      messagesStore.addMessage(error.message, 'error')
    }
  }

  watch(cart, (newCart) => {
    localStorage.setItem('batoi_cart', JSON.stringify(newCart))
  }, { deep: true })

  return { cart, totalItems, totalPrice, addBook, removeBook, clearCart, hasBook, checkout }
})