import { reactive } from 'vue'
import api from '../services/api'
import { messagesStore } from './messages'

export const modulesStore = reactive({
  modules: [],

  async fetchModules() {
    try {
      this.modules = await api.modules.getDBModules()
    } catch (error) {
      messagesStore.addMessage('Error cargando módulos', 'error')
      this.modules = [
        { code: '5021', cliteral: 'Desarrollo Web Entorno Cliente' },
        { code: '5025', cliteral: 'Despliegue de Aplicaciones Web' }
      ]
    }
  },

  getModuleName(code) {
    const mod = this.modules.find(m => m.code === code)
    return mod ? mod.cliteral : code
  }
})