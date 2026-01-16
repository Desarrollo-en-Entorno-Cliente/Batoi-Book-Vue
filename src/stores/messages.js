import { reactive } from 'vue'

export const messagesStore = reactive({
  messages: [],

  addMessage(text, type = 'info') {
    const id = Date.now()
    this.messages.push({ id, text, type })
    
    setTimeout(() => {
      this.deleteMessage(id)
    }, 5000)
  },

  deleteMessage(id) {
    this.messages = this.messages.filter(m => m.id !== id)
  }
})