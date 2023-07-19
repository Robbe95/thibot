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
  <div class="flex gap-2">
    <div v-if="!isMe" class="inline-block h-12 w-12 flex-none overflow-hidden rounded-full bg-neutral-800 p-0.5 shadow-main ">
      <img src="@/assets/hoofd.png" alt="Thibke" class=" pt-0.5">
    </div>
    <div v-else class="w-12 flex-none p-0.5" />

    <div
      class="w-full rounded px-4 py-3" :class="{
        'bg-neutral-200 text-right': isMe,
        'bg-neutral-800 text-left text-white': !isMe,
      }"
    >
      <div
        v-if="isFirstOfSender"
        class="text-lg font-bold" :class="{
          'text-neutral-900': isMe,
          'text-neutral-100': !isMe,
        }"
      >
        <p>
          {{ isMe ? 'Jij' : 'Thibaut' }}:
        </p>
      </div>
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
  </div>
</template>
