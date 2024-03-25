<template>
  <TopNav class="py-3 px-12" />

  <div class="w-66vw my-12 mx-auto relative">
    <img class="rounded-3xl" src="@/assets/sun.jpg" alt="" />
    <div class="text-center absolute bottom-3 left-2/4 transform -translate-x-1/2">
      <a-button class="bg-sky-800 text-white" @click="handleClick">let's go</a-button>
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
<style lang="scss" scoped></style>
