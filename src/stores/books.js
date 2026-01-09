import { reactive } from "vue";
import * as api from "../services/api";

export const store = {
    debug: true,
    state: reactive({
      todos: [],
    }),
    async fetchTodosAction() {
      if (this.debug) console.log("fetchTodosAction triggered");
      this.state.todos = await api.fetchTodos();
    }, 
    async addTodoAction(newTodo) {
        if (this.debug) console.log("addTodoAction triggered with ", newTodo);
        const addedTodo = await api.addTodo(newTodo);
        this.state.todos.push(addedTodo);
      },
      async removeTodoAction(todoIdToRemove) {
        if (this.debug)
          console.log("removeTodoAction triggered with id ", todoIdToRemove);
        await api.removeTodo(todoIdToRemove);
        this.state.todos = this.state.todos.filter((todo) => todo.id !== todoIdToRemove);
      },
      async toggleDoneAction(todoId, done) {
        if (this.debug)
          console.log("toggleDoneAction triggered with id ", todoId, " done: ", done);
        const updatedTodo =  await api.toggleTodoDone(todoId, done);
        const index = this.state.todos.findIndex((todo) => todo.id === todoId);
        if (index !== -1) {
          this.state.todos[index] = updatedTodo;
        }
      }
    };