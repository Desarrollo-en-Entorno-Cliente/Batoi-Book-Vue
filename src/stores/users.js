import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import { useMessagesStore } from './messages'

export const useUsersStore = defineStore('users', () => {
  const messagesStore = useMessagesStore()
  const users = ref([])
  const currentUser = ref(null)

  async function fetchUsers() {
    try {
      users.value = await api.users.getDBUsers()
      // Simulamos que el usuario logueado es el ID: 2
      currentUser.value = users.value.find(u => u.id === 2) || null
    } catch (error) {
      messagesStore.addMessage('Error cargando usuarios', 'error')
    }
  }

  function getUserNick(id) {
    const user = users.value.find(u => u.id === id)
    return user ? user.nick : 'Desconocido'
  }

  return { users, currentUser, fetchUsers, getUserNick }
})