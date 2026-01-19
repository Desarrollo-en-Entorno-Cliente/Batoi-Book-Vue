import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BookForm from '../components/BookForm.vue'
import BooksCart from '../components/BooksCart.vue'
import AppAbout from '@/components/AppAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout,
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: BookForm
    },
    {
      path: '/edit-book/:id',
      name: 'edit-book',
      component: BookForm,
      props: true 
    },
    {
      path: '/cart',
      name: 'cart',
      component: BooksCart
    }
  ],
})

export default router