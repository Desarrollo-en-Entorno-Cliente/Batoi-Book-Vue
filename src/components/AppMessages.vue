<script setup>
  import { messagesStore } from '../stores/messages'
  </script>
  
  <template>
    <div v-if="messagesStore.messages.length > 0">
      <div 
        v-for="msg in messagesStore.messages" 
        :key="msg.id"
        id="messages" 
        :class="msg.type"
      >
        {{ msg.text }}
        <button 
          type="button" 
          style="float:right; background:none; border:none; color:inherit; font-weight:bold; cursor:pointer;"
          @click="messagesStore.deleteMessage(msg.id)"
        >x</button>
      </div>
    </div>
  </template>