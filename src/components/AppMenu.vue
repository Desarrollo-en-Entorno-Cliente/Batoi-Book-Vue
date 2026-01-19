<script setup>
  import { RouterLink } from 'vue-router'
  </script>
  
  <template>
    <nav>
      <ul>
        <li><RouterLink to="/">Inicio</RouterLink></li>
        <li><RouterLink to="/add-book">Nuevo libro</RouterLink></li>
        <li><RouterLink to="/cart">Ver carrito</RouterLink></li>
        <li><RouterLink to="/about">Acerca de</RouterLink></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  a.router-link-active {
    font-weight: bold;
    color: var(--accent-primary);
  }
  </style>