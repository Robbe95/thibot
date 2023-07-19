<script setup lang="ts">
import type { Message } from '../models/chat.model'

const { log, isLoading } = defineProps<{ log: Message[]; isLoading: boolean }>()
</script>

<template>
  <div
    class="flex w-full flex-col gap-2 duration-200" :class="{
      'opacity-30': isLoading,
    }"
  >
    <ChatBubble
      v-for="(message, key) in log" :key="message.message" :message="message"
      :is-first-of-sender="log[key - 1]?.role !== message.role"
    />
  </div>
</template>
