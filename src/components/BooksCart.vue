<script setup>
import { useCartStore } from '../stores/cart'
import BookItem from './BookItem.vue'

const cartStore = useCartStore()

const handleEmptyCart = () => {
    if(confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        cartStore.clearCart()
    }
}
</script>

<template>
    <div class="cart-container">
        <h2>Carrito de Compra</h2>
        <div v-if="cartStore.cart.length === 0" class="empty-msg">
            <p>El carrito está vacío actualmente.</p>
        </div>
        <div v-else>
            <div id="cart-list">
                <BookItem v-for="book in cartStore.cart" :key="book.id" :book="book">
                    <button class="icon-button" @click="cartStore.removeBook(book.id)">
                        <span class="material-icons">remove_shopping_cart</span>
                    </button>
                </BookItem>
            </div>
            <div class="cart-summary">
                <div class="totals">
                    <p>Total Libros: <strong>{{ cartStore.totalItems }}</strong></p>
                    <p>Total a Pagar: <strong>{{ cartStore.totalPrice }} €</strong></p>
                </div>
                <div class="actions">
                    <button @click="handleEmptyCart" class="btn-danger">Vaciar Carrito</button>
                    <button @click="cartStore.checkout" class="btn-primary">Realizar Compra</button>
                </div>
            </div>
        </div>
    </div>
</template>