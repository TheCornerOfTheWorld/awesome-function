<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from 'vue-query'

defineOptions({
  name: 'VueQuery'
})

const id = ref(1)
const enabled = ref(false)

const { isLoading, data, isError, error } = useQuery(
  ['VueQuery', id],
  async () => {
    // throw new Error(1)
    console.log(id)

    const data = await fetch(document.documentURI)
    const res = await data.text()
    return res
  },
  { enabled }
)
function handleClick() {
  id.value += 1
  enabled.value = true
}
</script>
<template>
  <div @click="handleClick">id: {{ id }}</div>
  <div v-if="!isLoading">
    <div>{{ data }}</div>
  </div>
  <div v-else-if="isError">
    <div>{{ error }}</div>
  </div>
  <div v-else>...</div>
</template>
<style lang="scss" scoped></style>
