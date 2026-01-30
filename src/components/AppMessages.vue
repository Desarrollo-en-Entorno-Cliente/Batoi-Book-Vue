<script setup>
import { useMessagesStore } from '../stores/messages'
const messagesStore = useMessagesStore()
</script>

<template>
  <div v-if="messagesStore.messages.length > 0">
    <div v-for="msg in messagesStore.messages" :key="msg.id" id="messages" :class="msg.type">
      {{ msg.text }}
      <button @click="messagesStore.deleteMessage(msg.id)">x</button>
    </div>
  </div>
</template>