<script setup lang="ts">
import Voice from './voice.svg'
</script>

<template>
  <div class="flex items-end justify-start gap-2">
    <div class="w-12 flex-none p-0.5" />
    <div class=" flex  flex-col gap-2">
      <div
        class="mb-0.5 text-sm text-[#B3B3B3]"
      >
        <p>
          {{ 'Thibaut' }}:
        </p>
      </div>

      <div
        class=" text-left"
      >
        <div
          class="max-w-[80%]"
        >
          <button
            class="w-full rounded-xl bg-[#456990] px-4 py-3 text-left text-white"
          >
            <img :src="Voice">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
