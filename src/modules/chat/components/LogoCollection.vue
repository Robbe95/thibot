<script setup lang="ts">
import Fifa from '@/assets/logo/fifa.png'
import Hattrick from '@/assets/logo/hattrick.png'
import NoRacism from '@/assets/logo/no-racism.png'
import Respect from '@/assets/logo/respect.png'
</script>

<template>
  <div class="flex w-full items-center justify-between ">
    <div class="flex items-center gap-4">
      <img :src="Fifa" class="w-40 object-contain">
      <img :src="Respect" class="w-40 object-contain">
      <img :src="NoRacism" class="w-40 object-contain">
    </div>
    <img :src="Hattrick" class="w-40 object-contain">
  </div>
</template>
