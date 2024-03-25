<template>
  <div class="flex h-100vh">
    <MenuNav class="w-64 py-4 border-r-1 overflow-auto" />
    <transition name="fade">
      <keep-alive>
        <div class="flex-1 p-8">
          <router-view />
        </div>
      </keep-alive>
    </transition>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
