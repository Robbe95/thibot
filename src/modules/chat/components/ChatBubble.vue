<script setup lang="ts">
import type { Message } from '../models/chat.model'

interface Props {
  message: Message
  isFirstOfSender: boolean
  isLastOfSender: boolean
}
const { message } = defineProps<Props>()

const isMe = computed(() => message.role === 'user')
</script>

<template>
  <div class="mb-4 flex items-end justify-end gap-2">
    <img v-if="!isMe && isLastOfSender" src="@/assets/thibhaufd.png" alt="Thibke">
    <div v-else class="w-12 flex-none p-0.5" />

    <div
      class="w-full"
      :class="{
        'text-left': !isMe,
        'flex flex-col items-end justify-end': isMe,
      }"
    >
      <div
        v-if="isFirstOfSender"
        class="mb-0.5 text-sm text-[#B3B3B3]"
        :class="{
          'text-left': !isMe,
          'text-right': isMe,
        }"
      >
        <p>
          {{ isMe ? 'Jij' : 'Thibaut' }}:
        </p>
      </div>
      <TransitionExpand>
        <div
          v-if="message.isLoader"
          class="max-w-[80%]"
        >
          <p
            class="mb-1 w-full max-w-[80%] rounded-xl"
            :class="{
              'rounded-bl-none bg-[#456990] px-4 py-3 text-left text-white': !isMe,
              'rounded-bl-xl': !isLastOfSender && !isMe,
              'rounded-br-none bg-[#E9E9E9] px-4 py-3 text-left text-black': isMe,
            }"
          >
            <MessageLoader class="h-6" />
          </p>
        </div>
        <div
          v-else
          class="max-w-[80%]"
          :class=" {
            'flex justify-end': isMe,
          }"
        >
          <p
            class="mb-1 w-full  rounded-xl"
            :class="{
              'rounded-bl-none bg-[#456990] px-4 py-3 text-left text-white': !isMe,
              'rounded-bl-xl': !isLastOfSender && !isMe,
              'rounded-br-none bg-[#E9E9E9] px-4 py-3 text-left text-black': isMe,
            }"
            v-html="message.message"
          />
        </div>
      </TransitionExpand>

      <p
        v-if="isLastOfSender"
        class="text-[10px] text-[#B3B3B3]"
        :class="{
          'text-left': !isMe,
          'text-right': isMe,
        }"
      >
        {{ message.created_at.toLocaleTimeString() }} {{ message.created_at.toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>
