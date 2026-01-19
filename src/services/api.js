import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  books: {
    getDBBooks: async () => {
      const res = await apiClient.get('/books')
      return res.data
    },
    getDBBook: async (id) => {
      const res = await apiClient.get(`/books/${id}`)
      return res.data
    },
    addDBBook: async (book) => {
      const res = await apiClient.post('/books', book)
      return res.data
    },
    removeDBBook: async (id) => {
      await apiClient.delete(`/books/${id}`)
      return true
    },
    changeDBBook: async (book) => {
      const res = await apiClient.put(`/books/${book.id}`, book)
      return res.data
    },
    // CORREGIDO: Busca por idUser/idModule y filtra los vendidos
    existsDBBook: async (idUser, moduleCode) => {
      // Nota: En tu JSON las propiedades son idUser e idModule
      const res = await apiClient.get(`/books?idUser=${idUser}&idModule=${moduleCode}`)
      const userBooks = res.data
      // Solo devolvemos true si hay algún libro que NO tenga fecha de venta
      const activeBooks = userBooks.filter(book => !book.soldDate)
      return activeBooks.length > 0
    }
  },

  modules: {
    getDBModules: async () => {
      const res = await apiClient.get('/modules')
      return res.data
    }
  },

  users: {
    getDBUsers: async () => {
      const res = await apiClient.get('/users')
      return res.data
    },
    getDBUser: async (id) => {
      const res = await apiClient.get(`/users/${id}`)
      return res.data
    },
    addDBUser: async (user) => {
      const res = await apiClient.post('/users', user)
      return res.data
    },
    removeDBUser: async (id) => {
      await apiClient.delete(`/users/${id}`)
      return true
    },
    changeDBUser: async (user) => {
      const res = await apiClient.put(`/users/${user.id}`, user)
      return res.data
    },
    changeDBUserPassword: async (id, newPassword) => {
      const res = await apiClient.patch(`/users/${id}`, { password: newPassword })
      return res.data
    }
  },

  async buyBooks(cart, totalAmount) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const totalString = totalAmount.toString()
        const firstDigit = parseInt(totalString.charAt(0))

        if (firstDigit < 5) {
          reject(new Error('La transacción ha fallado'))
        } else {
          resolve({ success: true, message: 'Compra realizada con éxito' })
        }
      }, 500)
    })
  }
}