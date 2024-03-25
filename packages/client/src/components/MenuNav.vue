<template>
  <nav class="flex flex-col text-center">
    <TopNav class="h-16 mx-auto" />
    <RouterLink to="/EffectScope">EffectScope</RouterLink>
    <RouterLink to="/H5Camera">前端调取摄像头并实现拍照功能</RouterLink>
    <RouterLink to="/uploadLargeFile">大文件上传</RouterLink>
    <RouterLink to="/VirtualScroll">虚拟滚动</RouterLink>
    <RouterLink to="/FaceApi">人脸识别</RouterLink>
  </nav>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
<style lang="scss" scoped>
// nav a.router-link-exact-active {
//   color: var(--color-text);
// }

// nav a.router-link-exact-active:hover {
//   background-color: transparent;
// }

// nav a {
//   display: inline-block;
//   padding: 0 1rem;
//   border-left: 1px solid var(--color-border);
// }

// nav a:first-of-type {
//   border: 0;
// }
</style>
