<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'ShikiDemo'
})

const html = ref('')
onMounted(async () => {
  const code = 'const a = 1' // input code
  html.value = await codeToHtml(code, {
    lang: 'javascript',
    theme: 'vitesse-dark'
  })
})
</script>
<template>
  <div v-html="html"></div>
</template>
<style lang="scss" scoped></style>
