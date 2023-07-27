<script setup lang="ts">
import type { Message } from '../models/chat.model'

const { log, isLoading } = defineProps<{ log: Message[]; isLoading: boolean }>()
</script>

<template>
  <div
    class="flex flex-col justify-end gap-2 " :class="{
      'opacity-30': isLoading,
    }"
  >
    <ChatBubble
      v-for="(message, key) in log"
      :key="message.message" class="py-2" :message="message"
      :is-first-of-sender="log[key - 1]?.role !== message.role"
    />
  </div>
</template>
