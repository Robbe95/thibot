<script setup lang="ts">
import TheHeader from './TheHeader.vue'
</script>

<template>
  <main
    class="flex h-full max-h-screen min-h-[100dvh] flex-col overflow-hidden bg-black bg-cover lg:min-h-screen lg:items-center  lg:p-2 lg:px-12"
  >
    <TheHeader class="z-20" />

    <div class="absolute left-16 top-16">
      <img src="@/assets/thibke.png" class="h-40">
    </div>

    <div class="relative">
      <div class="relative z-10">
        <div class="absolute top-0 z-10 h-96 w-screen bg-gradient-to-t from-transparent to-black" />
      </div>

      <router-view />
    </div>
  </main>
</template>
