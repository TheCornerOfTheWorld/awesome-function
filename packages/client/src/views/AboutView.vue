<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div @click="goback">goback</div>
  </div>
</template>
<script setup lang="ts">
const goback = (): void => {
  history.go(-2)
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
