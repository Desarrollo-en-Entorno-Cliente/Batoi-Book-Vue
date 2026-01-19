<script setup>
  import { RouterView } from 'vue-router'
  import AppMenu from './components/AppMenu.vue'
  import AppMessages from './components/AppMessages.vue'
  </script>
  
  <template>
    <header>
      <h1>Batoi Books</h1>
      <AppMenu />
      <AppMessages />
    </header>
  
    <main>
      <div class="main-container">
        <RouterView />
      </div>
    </main>
  
    <footer>
      &copy; 2025 Batoi Books - Vue Edition
    </footer>
  </template>
  
  <style>
  @import './assets/main.css';
  
  .main-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>