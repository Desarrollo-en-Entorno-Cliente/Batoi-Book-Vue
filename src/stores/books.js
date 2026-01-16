import { reactive } from 'vue'
import api from '../services/api'
import { messagesStore } from './messages'
import { usersStore } from './users'

export const booksStore = reactive({
  books: [],
  bookToEdit: null,

  async fetchBooks() {
    try {
      this.books = await api.books.getDBBooks()
    } catch (error) {
      messagesStore.addMessage('Error al cargar libros: ' + error.message, 'error')
    }
  },

  async addBook(book) {
    try {
      if (!usersStore.currentUser) {
        messagesStore.addMessage('Error: No hay usuario identificado', 'error')
        return
      }

      const exists = await api.books.existsDBBook(usersStore.currentUser.id, book.moduleCode)
      if (exists) {
        messagesStore.addMessage('Ya tienes un libro de este módulo en venta', 'error')
        return
      }

      // Calcular ID manual
      const ids = this.books.map(b => Number(b.id))
      const maxId = ids.length > 0 ? Math.max(...ids) : 0
      const nextId = maxId + 1

      const newBook = { 
        ...book, 
        id: nextId.toString(),
        userId: usersStore.currentUser.id 
      }
      
      const addedBook = await api.books.addDBBook(newBook)
      this.books.push(addedBook)
      messagesStore.addMessage(`Libro añadido con ID ${nextId}`, 'success')
    } catch (error) {
      messagesStore.addMessage('Error al crear el libro', 'error')
    }
  },

  async updateBook(id, updatedData) {
    try {
      const currentBook = this.books.find(b => b.id === id)
      const bookToUpdate = { ...currentBook, ...updatedData }

      const response = await api.books.changeDBBook(bookToUpdate)
      
      const index = this.books.findIndex(b => b.id === id)
      if (index !== -1) this.books[index] = response
      
      messagesStore.addMessage('Libro actualizado correctamente', 'success')
      this.clearBookToEdit()
    } catch (error) {
      messagesStore.addMessage('Error al actualizar', 'error')
    }
  },

  async removeBook(id) {
    try {
      await api.books.removeDBBook(id)
      this.books = this.books.filter(b => b.id !== id)
      messagesStore.addMessage('Libro eliminado', 'success')
    } catch (error) {
      messagesStore.addMessage('Error al borrar', 'error')
    }
  },

  setBookToEdit(book) {
    if (book.soldDate) {
      messagesStore.addMessage('No se puede editar un libro vendido', 'error')
      return
    }
    if (usersStore.currentUser && book.userId !== usersStore.currentUser.id) {
       messagesStore.addMessage('No puedes editar libros de otros usuarios', 'error')
       return
    }

    this.bookToEdit = { ...book }
    document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })
  },

  clearBookToEdit() {
    this.bookToEdit = null
  }
})