<script setup>
  import AppMenu from './components/AppMenu.vue'
  import AppMessages from './components/AppMessages.vue'
  import BooksList from './components/BooksList.vue'
  import BookForm from './components/BookForm.vue'
  import AppAbout from './components/AppAbout.vue'
  </script>
  
  <template>
    <header>
      <h1>Batoi Books</h1>
      <AppMenu />
      <AppMessages />
    </header>
  
    <main>
      <div class="main-container">
        <BooksList />
        <hr style="margin: 40px 0; border-color: var(--border-color); opacity: 0.3;">
        <BookForm />
      </div>
  
      <AppAbout />
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