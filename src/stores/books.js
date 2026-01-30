import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'
import { useMessagesStore } from './messages'
import { useUsersStore } from './users'

export const useBooksStore = defineStore('books', () => {
  const messagesStore = useMessagesStore()
  const usersStore = useUsersStore()
  
  const books = ref([])
  const bookToEdit = ref(null)

  async function fetchBooks() {
    try {
      books.value = await api.books.getDBBooks()
    } catch (error) {
      messagesStore.addMessage('Error al cargar libros: ' + error.message, 'error')
    }
  }

  async function addBook(book) {
    try {
      const idUser = usersStore.currentUser ? usersStore.currentUser.id : 1
      const exists = await api.books.existsDBBook(idUser, book.moduleCode)
      
      if (exists) {
        messagesStore.addMessage('Ya tienes un libro de este módulo en venta', 'error')
        return
      }

      const ids = books.value.map(b => Number(b.id))
      const maxId = ids.length > 0 ? Math.max(...ids) : 0
      const nextId = maxId + 1

      const newBook = { 
        ...book, 
        id: nextId.toString(),
        idUser: idUser,
        idModule: book.moduleCode
      }
      
      const addedBook = await api.books.addDBBook(newBook)
      books.value.push(addedBook)
      messagesStore.addMessage(`Libro añadido con ID ${nextId}`, 'success')
    } catch (error) {
      messagesStore.addMessage('Error al crear el libro', 'error')
    }
  }

  async function updateBook(id, updatedData) {
    try {
      const currentBook = books.value.find(b => b.id === id)
      if(updatedData.moduleCode) updatedData.idModule = updatedData.moduleCode
      
      const bookToUpdate = { ...currentBook, ...updatedData }
      const response = await api.books.changeDBBook(bookToUpdate)
      
      const index = books.value.findIndex(b => b.id === id)
      if (index !== -1) books.value[index] = response
      
      messagesStore.addMessage('Libro actualizado correctamente', 'success')
      clearBookToEdit()
    } catch (error) {
      messagesStore.addMessage('Error al actualizar', 'error')
    }
  }

  async function removeBook(id) {
    if(confirm("¿Estás seguro de que quieres eliminar?")) {  
      try {
        await api.books.removeDBBook(id)
        books.value = books.value.filter(b => b.id !== id)
        messagesStore.addMessage('Libro eliminado', 'success')
      } catch (error) {
        messagesStore.addMessage('Error al borrar', 'error')
      }
    }
  }

  function setBookToEdit(book) {
    if (book.soldDate) {
      messagesStore.addMessage('No se puede editar un libro vendido', 'error')
      return
    }
    const bookOwnerId = book.idUser
    if (usersStore.currentUser && bookOwnerId !== usersStore.currentUser.id && bookOwnerId != 1) {
       messagesStore.addMessage('No puedes editar libros de otros usuarios', 'error')
       return
    }
    bookToEdit.value = { ...book }
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
  }

  function clearBookToEdit() {
    bookToEdit.value = null
  }

  return { books, bookToEdit, fetchBooks, addBook, updateBook, removeBook, setBookToEdit, clearBookToEdit }
})