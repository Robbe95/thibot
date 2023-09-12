<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { Conversation } from '@/modules/chat/models/chat.model'
import { getConversation, postConversation, postMessage } from '@/modules/chat/api/chat.api'

const route = useRoute()
const router = useRouter()
const currentChat = ref<string>(route.query.id as string)

const isSending = ref(false)
const isLoading = ref(false)
const conversation = ref<Conversation>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const hasConfirmed = defineModel<Boolean>('modelValue', {
  required: true,
})
const isMobile = breakpoints.smallerOrEqual('lg')

const scrollToBottom = (id: string): void => {
  const element = document.getElementById(id)
  if (element)
    element.scrollTop = element.scrollHeight
}

const handleCreateConversation = async (): Promise<void> => {
  isLoading.value = true
  if (!currentChat.value) {
    conversation.value = await postConversation()
    router.push({ query: { id: conversation.value.id } })
    currentChat.value = conversation.value.id
  }
  else { conversation.value = await getConversation(currentChat.value) }
  isLoading.value = false
  setTimeout(() => scrollToBottom('chat-log'), 1)
}

const currentMessage = ref<string>('')
const handleSendMessage = async (): Promise<void> => {
  isSending.value = true
  const message = currentMessage.value
  currentMessage.value = ''

  conversation.value?.messages.push({
    id: 'temp',
    updated_at: new Date(),
    message,
    role: 'user',
    created_at: new Date(),
  })
  setTimeout(() => scrollToBottom('chat-log'), 1)
  conversation.value = await postMessage(currentChat.value, message)
  isSending.value = false
  setTimeout(() => scrollToBottom('chat-log'), 200)
}

handleCreateConversation()
</script>

<template>
  <div class="container flex w-full  flex-col items-center justify-center gap-4 text-white ">
    <div class="w-[80ch]">
      <div v-if="conversation?.messages" id="chat-log" class="flex h-[45vh] flex-col justify-end gap-8 overflow-auto scroll-smooth py-4">
        <MessageV2
          v-for="(message, key) in conversation?.messages"
          :key="key"
          :message="message"
          :is-first="key === 0"
          :is-last="key === conversation.messages.length - 1"
          :is-first-of-sender="conversation?.messages[key - 1]?.role !== message.role"
          :is-last-of-sender="conversation?.messages[key + 1]?.role !== message.role"
          @height-changed="scrollToBottom('chat-log')"
        />
      </div>

      <input
        v-model="currentMessage"
        placeholder="Stel een vraag.."
        class="mt-20 w-full border-b border-neutral-500 bg-black py-2 text-3xl outline-none !ring-transparent
         placeholder:transition-all placeholder:duration-500 focus:border-white focus:placeholder:translate-x-2 focus:placeholder:opacity-0"
        @keydown.enter="handleSendMessage"
      >
    </div>
  </div>
</template>

<style scoped>
</style>
