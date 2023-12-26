<script setup lang="ts">
import { onMounted, ref } from 'vue'

const videoEl = ref<HTMLVideoElement>()
const wrapper = ref<HTMLDivElement>()

function shoot() {
  if (!videoEl.value || !wrapper.value) return

  const canvas = document.createElement('canvas')
  canvas.width = videoEl.value.videoWidth
  canvas.height = videoEl.value.videoHeight
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(videoEl.value, 0, 0, canvas.width, canvas.height)
  wrapper.value.appendChild(canvas)
}

async function checkCamera() {
  const mediaDevices = window.navigator.mediaDevices
  const devices = await mediaDevices.enumerateDevices()
  if (mediaDevices.getUserMedia && devices) {
    const stream = await mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 500,
        height: 500,
        facingMode: { exact: 'user' } // 前置相机
        // facingMode: { exact: 'environment' } // 后置相机
      }
    })
    if (!videoEl.value) return

    videoEl.value.srcObject = stream
    videoEl.value.play()
  } else {
    console.log('getUserMedia not supported')
  }
}

onMounted(() => {
  checkCamera()
})
</script>

<template>
  <div ref="wrapper" class="w-full h-full bg-red flex flex-col items-center">
    <video ref="videoEl" />
    <div @click="shoot" class="w-100px leading-100px text-center bg-black text-30px">拍摄</div>
  </div>
</template>
