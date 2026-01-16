import { reactive } from 'vue'
import api from '../services/api'
import { messagesStore } from './messages'

export const usersStore = reactive({
  users: [],
  currentUser: null,

  async fetchUsers() {
    try {
      this.users = await api.users.getDBUsers()
      this.currentUser = this.users.find(u => u.id === 2) || null
      
    } catch (error) {
      messagesStore.addMessage('Error cargando usuarios', 'error')
    }
  },

  getUserNick(id) {
    const user = this.users.find(u => u.id === id)
    return user ? user.nick : 'Desconocido'
  }
})