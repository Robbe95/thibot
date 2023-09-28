<script setup lang="ts">
// @ts-expect-error - Import probably not typed or something idc
import VueWriter from 'vue-writer'
import { useElementBounding } from '@vueuse/core'
import type { Message } from '../models/chat.model'

interface Props {
  message: Message
  isFirstOfSender: boolean
  isLastOfSender: boolean
  isFirst: boolean
  isLast: boolean
}
const { message } = defineProps<Props>()
const emit = defineEmits<{
  heightChanged: []
}>()
const isMe = computed(() => message.role === 'user')

const writer = ref<HTMLElement>()

const { height } = useElementBounding(writer)

watch(
  () => height.value,
  () => {
    emit('heightChanged')
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="flex items-end justify-start gap-8"
  >
    <div
      class="flex w-full flex-col "
      :class="{
        'text-left': !isMe,
        'items-end justify-end': isMe,
      }"
    >
      <TransitionExpand>
        <div
          ref="writer"
          class="text-3xl"
          :class=" {
            'text-neutral-400': !isLast,
            'text-left': !isMe,
            'flex justify-end': isMe,
          }"
        >
          <VueWriter v-if="isLast && !isMe" :array="[message.message]" :type-speed="10" :iterations="1" />
          <p v-else v-html="message.message" />
        </div>
      </TransitionExpand>

      <!-- <p
        v-if="isLastOfSender"
        class="text-[10px] text-[#B3B3B3]"
        :class="{
          'text-left': !isMe,
          'text-right': isMe,
        }"
      >
        {{ message.created_at.toLocaleTimeString() }} {{ message.created_at.toLocaleDateString() }}
      </p> -->
    </div>
  </div>
</template>
