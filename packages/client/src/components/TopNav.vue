<template>
  <div class="wrapper">
    <IconSignature @click="handleClick" class="icon-signature" />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function handleClick() {
  router.push({ path: '/' })
}
</script>
<style lang="scss" scoped>
.icon-signature {
  width: 92px;
}
</style>
