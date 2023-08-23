<script setup lang="ts">
import { routeNames } from '@/router/routes.type'

const links = [
  {
    name: routeNames.INDEX,
    text: 'V1',
  },
  {
    name: routeNames.INDEX_V2,
    text: 'V2',
  },
]

const activeRouteName = useRoute().name
</script>

<template>
  <div class="flex w-full justify-end gap-4 py-4 text-xl text-white">
    <RouterLink
      v-for="link in links" :key="link.name" :to="{ name: link.name }"
      :class="{
        'border-b border-white text-white': activeRouteName === link.name,
        'hover:text-primary-500': activeRouteName !== link.name,
      }"
    >
      {{ link.text }}
    </RouterLink>
  </div>
</template>
