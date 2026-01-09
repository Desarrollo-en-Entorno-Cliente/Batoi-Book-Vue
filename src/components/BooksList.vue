<script>
import BookItem from './BookItem.vue';
</script>

<template>
    <div id="list">
        <BookItem v-for="value in source"/>
    </div>
</template>