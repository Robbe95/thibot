<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { Conversation } from '@/modules/chat/models/chat.model'
import { getConversation, postConversation, postMessage } from '@/modules/chat/api/chat.api'
import { fadeTransition } from '@/transitions'

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
  setTimeout(() => scrollToBottom('chat-log'), 500)
}

handleCreateConversation()
</script>

<template>
  <div class="flex flex-1 lg:items-center lg:justify-center ">
    <Transition v-bind="fadeTransition" mode="out-in">
      <div v-if="hasConfirmed || !isMobile" class="container mx-auto grid flex-1 grid-cols-1 gap-2 lg:grid-cols-2 lg:items-center lg:justify-center">
        <div class="hidden items-center justify-center lg:flex">
          <!-- <img src="@/assets/thibke.png" alt="Chat" class="h-[40rem] "> -->
        </div>
        <div class="flex flex-1 flex-col overflow-hidden bg-white lg:items-center lg:justify-center lg:rounded-lg">
          <div class="grid w-full grid-cols-3 bg-primary-500 px-4 py-2 text-left">
            <h1
              class=" flex w-full items-center gap-4  text-xl font-bold text-white
      "
            >
              Thibaut
            </h1>
            <div class="flex w-full items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="47" height="19" viewBox="0 0 47 19" fill="none">
                <path d="M5.58861 8.01151L7.29461 11.5019L11.1576 12.0706L8.37312 14.7767L9.02022 18.6201L5.58861 16.816L2.1374 18.6201L2.7845 14.7767L0 12.0706L3.86301 11.5019L5.58861 8.01151Z" fill="white" />
                <path d="M40.9243 8.01151L39.1987 11.5019L35.3553 12.0706L38.1398 14.7767L37.4731 18.6201L40.9243 16.816L44.3756 18.6201L43.7089 14.7767L46.513 12.0706L42.65 11.5019L40.9243 8.01151Z" fill="white" />
                <path d="M23.2564 0.0526276L25.7076 5.03336L31.2178 5.83734L27.2371 9.71995L28.1784 15.2105L23.2564 12.6221L18.3345 15.2105L19.2758 9.71995L15.2755 5.83734L20.7857 5.03336L23.2564 0.0526276Z" fill="white" />
              </svg>
            </div>
          </div>

          <div id="chat-log" class=" flex h-[calc(100dvh-6.8rem)] w-full flex-col justify-between gap-2 overflow-auto scroll-smooth bg-white shadow-main lg:h-[60vh]">
            <div class="h-full px-4 py-2">
              <ChatLog v-if="conversation?.messages" :log="conversation?.messages" :is-loading="isSending" />
            </div>
          </div>
          <div class="w-full bg-[#E9E9E9] px-4 py-3">
            <ChatInput :is-loading="isSending" @send="handleSendMessage" />
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-4 px-12">
        <p
          class="mb-1 mt-20 w-full rounded-xl bg-[#456990] px-4 py-3 text-left text-white shadow-main"
        >
          Hej, ik ben Thibaut Courtois, je digitale welzijnscoach. Laten we samen werken aan je mentale kracht en voetbalplezier. Waar wil je vandaag over praten?
        </p>
        <button class="flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-center text-[#456990]" @click="hasConfirmed = true">
          <div>
            Chat met mij
          </div>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_846_1022)">
              <path d="M5.82312 19.8781L20.2521 13.1791C21.2501 12.7161 21.2501 11.2821 20.2521 10.8191L5.82312 4.12205C4.78812 3.64205 3.69312 4.66005 4.08012 5.74305L6.31312 11.9971L4.08012 18.2581C3.69312 19.3401 4.78812 20.3581 5.82312 19.8781Z" stroke="#456990" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.31006 12H21.0001" stroke="#456990" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_846_1022">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>
