<template>
  <nav class="flex flex-col text-center">
    <TopNav class="h-16 mx-auto mb-4" />
    <RouterLink class="py-1" v-for="route in showRoutes" :key="route.path" :to="route.path">
      {{ route.name }}
    </RouterLink>
  </nav>
</template>
<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const routes = ref(router.getRoutes())

const showRoutes = computed(() => {
  const filterRouteList = ['home', '404', 'DocView']
  return routes.value.filter((i) => i.name && !filterRouteList.includes(i.name))
})
</script>
<style lang="scss" scoped></style>
