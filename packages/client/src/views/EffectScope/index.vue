<template>
  <div>
    {{ `x: ${x}, y: ${y}` }}
  </div>
</template>
<script setup lang="ts">
import useSharedMouse from './hooks/useMouse'
const { x, y } = useSharedMouse()
</script>
