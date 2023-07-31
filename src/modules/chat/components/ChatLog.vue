<script setup lang="ts">
import type { Message } from '../models/chat.model'
import { listTransition } from '@/transitions'

const { log, isLoading } = defineProps<{ log: Message[]; isLoading: boolean }>()

const lastMessage = computed(() => log[log.length - 1])

const messagesWithoutLastMessage = computed(() => log.slice(0, log.length - 1))

const messagesWithLoading = computed<Message[]>(() => {
  if (isLoading) {
    return [
      ...log,
      { message: '...', role: 'assistant', created_at: new Date(), id: '0', updated_at: new Date(), isLoader: true },
    ]
  }
  return log
})
</script>

<template>
  <div
    class="flex flex-col justify-end gap-2"
  >
    <TransitionGroup v-bind="listTransition">
      <ChatBubble
        v-for="(message, key) in messagesWithLoading"
        :key="key"
        :message="message"
        :is-first-of-sender="log[key - 1]?.role !== message.role"
        :is-last-of-sender="log[key + 1]?.role !== message.role"
      />
    </TransitionGroup>
  </div>
</template>
