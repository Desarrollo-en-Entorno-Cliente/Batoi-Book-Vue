<script setup>
    import { cartStore } from '../stores/cart'
    import BookItem from './BookItem.vue'
    
    const handleRemove = (id) => {
        cartStore.removeBook(id)
    }
    
    const handleEmptyCart = () => {
        if(confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            cartStore.clearCart()
        }
    }
    
    const handleCheckout = () => {
        cartStore.checkout()
    }
    </script>
    
    <template>
        <div class="cart-container">
            <h2>Carrito de Compra</h2>
            
            <div v-if="cartStore.cart.length === 0" class="empty-msg">
                <p>El carrito está vacío actualmente.</p>
            </div>
    
            <div v-else>
                <div id="cart-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                    <BookItem 
                        v-for="book in cartStore.cart" 
                        :key="book.id" 
                        :book="book"
                    >
                        <button 
                            class="icon-button"
                            title="Eliminar del carrito" 
                            @click="handleRemove(book.id)"
                            style="color: var(--accent-tertiary);"
                        >
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
                        <button @click="handleEmptyCart" class="btn-danger">
                            Vaciar Carrito
                        </button>
                        <button @click="handleCheckout" class="btn-primary">
                            Realizar Compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </template>
    
    <style scoped>
    .cart-container {
        padding: 20px;
    }
    .empty-msg {
        text-align: center;
        padding: 40px;
        background-color: var(--bg-card);
        border-radius: var(--border-radius);
        color: var(--text-mid);
    }
    .cart-summary {
        margin-top: 30px;
        padding: 20px;
        background-color: var(--bg-card);
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }
    .totals p {
        font-size: 1.2rem;
        margin: 5px 0;
    }
    .totals strong {
        color: var(--accent-primary);
        font-size: 1.4rem;
    }
    .actions {
        display: flex;
        gap: 15px;
    }
    button.btn-primary, button.btn-danger {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
    }
    button.btn-primary {
        background-color: var(--accent-primary);
        color: white;
    }
    button.btn-danger {
        background-color: transparent;
        border: 1px solid var(--accent-tertiary);
        color: var(--accent-tertiary);
    }
    button.btn-primary:hover { opacity: 0.9; }
    button.btn-danger:hover { background-color: var(--accent-tertiary); color: white; }
    </style>