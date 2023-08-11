<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import type { Message } from '../models/chat.model'
import { listTransition, scaleBounceTransition } from '@/transitions'

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

const videoModal = ref<HTMLElement>()
const isVoiceOpen = ref(false)

onClickOutside(videoModal, () => {
  isVoiceOpen.value = false
})
</script>

<template>
  <div
    class="flex flex-col justify-end gap-2"
  >
    <TransitionGroup v-bind="listTransition">
      <ChatVoiceMessage @click="isVoiceOpen = true" />
      <ChatBubble
        v-for="(message, key) in messagesWithLoading"
        :key="key"
        :message="message"
        :is-first="key === 0"
        :is-last="key === messagesWithLoading.length - 1"
        :is-first-of-sender="log[key - 1]?.role !== message.role"
        :is-last-of-sender="log[key + 1]?.role !== message.role"
      />
    </TransitionGroup>
    <Transition v-bind="scaleBounceTransition">
      <ChatVideoModal v-if="isVoiceOpen" ref="videoModal" @close="isVoiceOpen = false" />
    </Transition>
  </div>
</template>
