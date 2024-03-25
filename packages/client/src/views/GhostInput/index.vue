<template>
  <label class="input-container">
    <input class="input bg-sky-500" type="text" v-model="value" @keydown.tab.prevent="handleTab" />
    <div class="suggestion-text">{{ suggestion }}</div>
  </label>
</template>
<script setup lang="ts">
import { watch } from 'vue'
import { ref } from 'vue'

const value = ref('')
const suggestion = ref('')

const suggestions = ['amazing']

watch(value, (val) => {
  if (val) {
    suggestion.value = suggestions.find((i) => i.includes(val))
  } else {
    suggestion.value = ''
  }
})
const handleTab = () => {
  const target = suggestions.find((str) => str.includes(value.value))
  if (!target) return
  value.value = target
}
</script>
<style scoped>
.input-container {
  position: relative;
}
.input {
  position: absolute;
}
.suggestion-text {
  position: absolute;
  z-index: 1;
  cursor: text;
  opacity: 0.6;
}
</style>
