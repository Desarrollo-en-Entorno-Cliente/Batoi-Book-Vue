import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import { useMessagesStore } from './messages'

export const useModulesStore = defineStore('modules', () => {
  const messagesStore = useMessagesStore()
  const modules = ref([])

  async function fetchModules() {
    try {
      modules.value = await api.modules.getDBModules()
    } catch (error) {
      messagesStore.addMessage('Error cargando módulos', 'error')
      modules.value = [
        { code: '5021', cliteral: 'Desarrollo Web Entorno Cliente' },
        { code: '5025', cliteral: 'Despliegue de Aplicaciones Web' }
      ]
    }
  }

  function getModuleName(code) {
    const mod = modules.value.find(m => m.code === code)
    return mod ? mod.cliteral : code
  }

  return { modules, fetchModules, getModuleName }
})