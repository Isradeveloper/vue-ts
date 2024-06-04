<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2">
      <!-- Messages go here -->
      <!-- <ChatBubble
        v-for="{ id, itsMine, message, image } in messages"
        :key="id"
        :its-mine="itsMine"
        :message="message"
        :image="image"
      /> -->
      <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import ChatBubble from './ChatBubble.vue';
import { ref, watch } from 'vue';
import { sleep } from '@/helpers/sleep';

interface Props {
  messages: ChatMessage[];
}

const { messages } = defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);

watch(messages, () => {
  setTimeout(async () => {
    chatRef.value?.scrollTo({
      top: chatRef.value.scrollHeight,
      behavior: 'smooth',
    });
    await sleep(1.5);
    chatRef.value?.scrollTo({
      top: chatRef.value.scrollHeight,
      behavior: 'smooth',
    });
  }, 100);
});
</script>
