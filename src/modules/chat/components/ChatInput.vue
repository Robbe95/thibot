<script setup lang="ts">
const { isLoading } = defineProps<{ isLoading: boolean }>()

const emits = defineEmits<{
  send: [message: string]
}>()
const input = ref('')

const handleSubmit = (): void => {
  if (input.value === '')
    return

  emits('send', input.value)
  input.value = ''
}
</script>

<template>
  <div class="w-full">
    <FormInputField v-model="input" class="h-full !w-full" placeholder="Stel een vraag." @keydown.enter="handleSubmit">
      <template #back-content>
        <AppButton class="max-h-max rounded-l-none px-4" :is-loading="isLoading" @click="handleSubmit">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6" viewBox="0 0 32 32"><path fill="currentColor" d="m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L7 16L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78Zm-20.9 10L8.76 17H18v-2H8.76L6.55 6.89L24.76 16Z" /></svg>
        </AppButton>
      </template>
    </FormInputField>
  </div>
</template>
