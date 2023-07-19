<script setup lang="ts">
import type { Message } from '../models/chat.model'

interface Props {
  message: Message
  isFirstOfSender: boolean
}
const { message } = defineProps<Props>()

const isMe = computed(() => message.role === 'user')
</script>

<template>
  <div
    class="w-full rounded px-2 py-1" :class="{
      'bg-neutral-200 text-right': isMe,
      'bg-neutral-800 text-left text-white': !isMe,
    }"
  >
    <p
      v-if="isFirstOfSender"
      class="text-lg font-bold" :class="{
        'text-neutral-900': isMe,
        'text-neutral-100': !isMe,
      }"
    >
      {{ isMe ? 'Jij' : 'Assistant' }}:
    </p>
    <p class="mb-0.5" v-html="message.message" />

    <p
      class="text-[10px] " :class="{
        'text-neutral-600': isMe,
        'text-neutral-400': !isMe,

      }"
    >
      {{ message.created_at.toLocaleTimeString() }} {{ message.created_at.toLocaleDateString() }}
    </p>
  </div>
</template>
