import axios from 'axios'

// 1. Configuración general del cliente Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Asegúrate de que este puerto es correcto
  withCredentials: false, // Cambiar a true si usas cookies/sesiones
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// 2. Definición de los repositorios para cada tabla

// TABLA 1: USUARIOS (Ejemplo de las "anteriores")
const users = {
  getAll: () => apiClient.get('/users'),
  getOne: (id) => apiClient.get(`/users/${id}`),
  create: (item) => apiClient.post('/users', item),
  modify: (item) => apiClient.put(`/users/${item.id}`, item),
  delete: (id) => apiClient.delete(`/users/${id}`),
  // Método personalizado específico para usuarios
  changePassword: (id, newPass) => apiClient.patch(`/users/${id}`, { password: newPass })
}

// TABLA 2: PRODUCTOS
const books = {
  getAll: () => apiClient.get('/books'),
  getOne: (id) => apiClient.get(`/books/${id}`),
  create: (item) => apiClient.post('/books', item),
  modify: (item) => apiClient.put(`/books/${item.id}`, item),
  delete: (id) => apiClient.delete(`/books/${id}`),
  updateStock: (item) => apiClient.patch(`/books/${item.id}`, { stock: item.stock })
}

// TABLA 3: PEDIDOS
const orders = {
  getAll: () => apiClient.get('/orders'),
  getOne: (id) => apiClient.get(`/orders/${id}`),
  create: (item) => apiClient.post('/orders', item),
  modify: (item) => apiClient.put(`/orders/${item.id}`, item),
  delete: (id) => apiClient.delete(`/orders/${id}`),
  // Ejemplo: cancelar un pedido
  cancel: (id) => apiClient.patch(`/orders/${id}`, { status: 'cancelled' })
}

// 3. Exportación unificada
export default {
  users,
  books,
  orders
}