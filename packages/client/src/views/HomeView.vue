<script setup lang="ts">
import { onMounted, ref } from 'vue'

const videoEl = ref<HTMLVideoElement>()

onMounted(() => {
  const mediaDevices = window.navigator.mediaDevices

  mediaDevices.getUserMedia =
    mediaDevices.getUserMedia || mediaDevices.webkitGetUserMedia || mediaDevices?.mozGetUserMedia

  if (mediaDevices.getUserMedia) {
    const stream = mediaDevices.getUserMedia({
      audio: false,
      video: { width: 500, height: 500, facingMode: 'user' }
    })
    if (!videoEl.value) return

    videoEl.value.srcObject = stream
    videoEl.value.play()
  } else {
    console.log('getUserMedia not supported')
  }
})
</script>

<template>
  <video ref="videoEl" />
</template>
