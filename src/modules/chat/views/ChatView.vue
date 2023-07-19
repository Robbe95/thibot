<script setup lang="ts">
import type { Conversation } from '@/modules/chat/models/chat.model'
import { getConversation, postConversation, postMessage } from '@/modules/chat/api/chat.api'

const route = useRoute()
const router = useRouter()
const currentChat = ref<string>(route.query.id as string)

const isSending = ref(false)
const isLoading = ref(false)
const conversation = ref<Conversation>()

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

const handleSendMessage = async (message: string): Promise<void> => {
  isSending.value = true
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
  setTimeout(() => scrollToBottom('chat-log'), 1)
}

handleCreateConversation()
</script>

<template>
  <div class="container mx-auto grid flex-1 grid-cols-1 gap-2 lg:grid-cols-2 lg:items-center lg:justify-center">
    <div class="hidden items-center justify-center lg:flex">
      <img src="@/assets/thibke.png" alt="Chat" class="h-[40rem] ">
    </div>
    <div class="flex flex-1 flex-col gap-2 overflow-auto lg:items-center lg:justify-center">
      <h1
        class=" flex w-full items-center gap-4 rounded bg-neutral-200 px-2 py-1 text-left text-5xl font-bold text-black
      "
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 15.5c0 1.11-.89 2-2 2s-2-.89-2-2s.9-2 2-2s2 .9 2 2m-9-2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.89 2-2s-.89-2-2-2M23 15v3c0 .55-.45 1-1 1h-1v1c0 1.11-.89 2-2 2H5a2 2 0 0 1-2-2v-1H2c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1h1c0-3.87 3.13-7 7-7h1V5.73c-.6-.34-1-.99-1-1.73c0-1.1.9-2 2-2s2 .9 2 2c0 .74-.4 1.39-1 1.73V7h1c3.87 0 7 3.13 7 7h1c.55 0 1 .45 1 1m-2 1h-2v-2c0-2.76-2.24-5-5-5h-4c-2.76 0-5 2.24-5 5v2H3v1h2v3h14v-3h2v-1Z" /></svg>
        ThiBot
      </h1>

      <div class="flex max-h-[calc(100vh-6rem)] w-full flex-1 flex-col justify-between gap-2 rounded bg-white py-4 shadow-main lg:max-h-[60vh]">
        <!-- <h2 class="text-xl font-bold">
          Chat: {{ currentChat }}
        </h2> -->
        <div class="overflow-auto px-4">
          <ChatLog v-if="conversation?.messages" class="h-full flex-1" :log="conversation?.messages" :is-loading="isSending" />
        </div>
        <div class="px-4">
          <ChatInput :is-loading="isSending" @send="handleSendMessage" />
        </div>
      </div>
    </div>
  </div>
</template>
