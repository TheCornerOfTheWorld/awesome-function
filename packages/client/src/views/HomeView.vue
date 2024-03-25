<template>
  <TopNav class="py-3 px-12 mb-8" />
  <div class="home-wrapper w-66vw mx-auto rounded-lg group" @click="handleClick">
    <div
      class="inline-block text-white text-2xl transition transition-transform transform -translate-x-full translate-y-50vh group-hover:translate-x-50vw"
    >
      Let's go >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function handleClick() {
  router.push({ name: 'DocView' })
}
</script>
<style lang="scss" scoped>
.home-wrapper {
  height: 78vh;
  background-image: url('@/assets/sun.jpg');
}
</style>
