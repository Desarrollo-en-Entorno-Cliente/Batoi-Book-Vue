<script>
import { store } from '../stores/books.js';
onMounted(async () => {
  try {
    await store.fetchTodosAction();
  } catch (error) {
    alert("Error fetching todos: " + error.message);
  }
});
const todos = computed(() => store.state.todos);

</script>

<template>
    <ul v-if="todos.length">
    <todo-item v-for="todo in todos" :key="todo.id" :item="todo" />
  </ul>
  <p v-else>No hay tareas que mostrar</p>
</template>