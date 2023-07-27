<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import BackgroundImage from '@/assets/background.png'
import BackgroundMobileImage from '@/assets/background-mobile.png'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smallerOrEqual('lg')
const hasConfirmed = ref(false)
</script>

<template>
  <main class="flex h-full max-h-screen min-h-[100dvh] flex-col overflow-hidden  bg-[#456990] bg-cover lg:min-h-screen lg:items-center lg:justify-between lg:p-2 lg:px-12" :style="`background-image: url('${isMobile ? BackgroundMobileImage : BackgroundImage}');`">
    <div v-if="!isMobile" class="h-20" />
    <router-view v-model="hasConfirmed" />
    <img v-if="!hasConfirmed" src="@/assets/courtois-background.png" alt="Chat" class="lg:hidden">
    <LogoCollection v-if="!isMobile" />
  </main>
</template>
