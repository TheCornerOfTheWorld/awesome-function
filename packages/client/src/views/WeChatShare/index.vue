<script setup lang="ts">
import { onMounted } from 'vue'
import { wxShareInit } from './utils'

defineOptions({
  name: 'WeChatShare'
})
onMounted(() => {
  wxShareInit(location.href)
})
</script>
<template>
  <div>
    <button>share</button>
  </div>
</template>
<style lang="scss" scoped></style>
