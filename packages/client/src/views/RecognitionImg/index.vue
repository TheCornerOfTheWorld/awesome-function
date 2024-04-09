<script setup lang="ts">
import Tesseract from 'tesseract.js'
import { onMounted, ref } from 'vue'
defineOptions({
  name: 'RecognitionImg'
})
const showText = ref('')
onMounted(async () => {
  const {
    data: { text }
  } = await Tesseract.recognize('/chi_sim.png', 'chi_sim')
  console.log(text)
  showText.value = text
})
</script>
<template>
  <div>{{ showText }}</div>
</template>
<style lang="scss" scoped></style>
