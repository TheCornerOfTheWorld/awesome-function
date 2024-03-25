<template>
  <a-button class="mb-3" @click="detectFace">真实镜</a-button>
  <div class="relative">
    <img ref="inputImgRef" :src="base64Img" style="max-width: 800px" />
    <canvas ref="overlayRef" class="overlay" />
  </div>
  <video width="500" height="300" ref="videoRef" autoplay />
</template>

<script setup lang="ts">
import base64Img from './base64Image'
import * as faceApi from 'face-api.js'
import { shallowRef, onMounted } from 'vue'

const videoRef = shallowRef<HTMLVideoElement | null>(null)
const inputImgRef = shallowRef<HTMLImageElement | null>(null)
const overlayRef = shallowRef<HTMLCanvasElement | null>(null)

const loadModel = async () => {
  await faceApi.nets.tinyFaceDetector.loadFromUri('/models')
  await faceApi.nets.faceLandmark68Net.loadFromUri('/models')
  await faceApi.nets.faceRecognitionNet.loadFromUri('/models')
  await faceApi.nets.faceExpressionNet.loadFromUri('/models')
  await faceApi.nets.ssdMobilenetv1.loadFromUri('/models')
}

const startVideo = async () => {
  const video = videoRef.value
  if (!video) return
  const stream = await window.navigator.mediaDevices.getUserMedia({ video: {} })
  video.srcObject = stream
}

const detectFace = async () => {
  const video = videoRef.value
  if (!video) return
  console.log(video)

  const isHas = faceApi.nets.tinyFaceDetector.params
  console.log('🚀 ~ detectFace ~ isHas:', isHas)

  // const vedioDetections = await faceApi
  //   .detectAllFaces(video)
  //   .withFaceLandmarks()
  //   .withFaceExpressions()

  // console.log('🚀 ~ detectFace ~ vedioDetections:', vedioDetections)

  const inputImgEl = inputImgRef.value
  if (!inputImgEl) return

  const imgDetections = await faceApi
    .detectAllFaces(inputImgEl)
    .withFaceLandmarks()
    .withFaceExpressions()
  console.log('🚀 ~ detectFace ~ detections:', imgDetections)

  let canvas = overlayRef.value
  if (!canvas) return
  faceApi.matchDimensions(canvas, inputImgEl)

  const resizedResults = faceApi.resizeResults(imgDetections, inputImgEl)
  const minConfidence = 0.05
  faceApi.draw.drawDetections(canvas, resizedResults)
  faceApi.draw.drawFaceExpressions(canvas, resizedResults, minConfidence)

  // requestAnimationFrame(detectFace)
}

const init = async () => {
  await loadModel()
  await startVideo()
  detectFace()
}

onMounted(() => {
  init()
})
</script>
<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
