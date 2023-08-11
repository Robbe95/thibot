<script setup lang="ts">
const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="absolute left-0 top-0 z-10 h-full w-full backdrop-blur-sm">
    <div class="relative h-full w-full p-2 lg:p-16">
      <div class="relative flex h-full w-full items-center justify-center">
        <button class="absolute right-4 top-4 z-20 text-black" @click="emits('close')">
          <CloseIcon class="h-6 w-6" />
        </button>

        <div class="overflow-hidden rounded" style="aspect-ratio: 1/1;">
          <video src="@/assets/thibot.mp4" autoplay class=" h-full w-full rounded-full bg-cover object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>
