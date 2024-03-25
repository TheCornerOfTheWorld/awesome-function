<template>
  <button @click="handleClick">play</button>
  <canvas ref="play" style="width: 300px"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Parser, Player } from 'svga'
import url from './Rocket.svga'

const play = ref(null)
onMounted(() => {})
async function handleClick() {
  const parser = new Parser()
  const svga = await parser.load(url)
  const player = new Player({
    container: play.value,
    loop: 1,
    isCacheFrames: true
  })
  await player.mount(svga)
  player.onEnd = () => {}
  player.start()
}
</script>
<style></style>
