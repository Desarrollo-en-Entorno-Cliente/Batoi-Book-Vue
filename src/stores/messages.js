import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref([])

  function addMessage(text, type = 'info') {
    const id = Date.now()
    messages.value.push({ id, text, type })
    
    setTimeout(() => {
      deleteMessage(id)
    }, 5000)
  }

  function deleteMessage(id) {
    messages.value = messages.value.filter(m => m.id !== id)
  }

  return { messages, addMessage, deleteMessage }
})