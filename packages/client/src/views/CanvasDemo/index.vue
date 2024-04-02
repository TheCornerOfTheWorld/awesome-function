<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

defineOptions({
  name: 'CanvasDemo'
})
const canvas = ref<HTMLCanvasElement>()
const isDraw = ref(false)

const ctx = computed(() => {
  if (canvas.value) {
    return canvas.value.getContext('2d')
  }
  return {} as CanvasRenderingContext2D
})

const canvasRect = computed(() => canvas.value?.getBoundingClientRect() || ({} as DOMRect))

function onmousedown() {
  isDraw.value = true
}
function onmousemove(event: MouseEvent) {
  if (!isDraw.value) return
  if (!ctx.value) return

  const { pageX, pageY } = event || {}
  const { left = 0, top = 0 } = canvasRect.value || {}

  // 计算鼠标在canvas里的位置
  const x = pageX - left
  const y = pageY - top
  // 设置globalCompositeOperation
  ctx.value.globalCompositeOperation = 'destination-out'
  // 画圆
  ctx.value.arc(x, y, 10, 0, 2 * Math.PI)
  // 填充圆形
  ctx.value.fill()
}
onMounted(() => {
  if (!ctx.value) return

  // 填充的颜色
  ctx.value.fillStyle = 'darkgray'
  // 填充矩形 fillRect(起始X,起始Y,终点X,终点Y)
  ctx.value.fillRect(0, 0, 400, 100)
  ctx.value.fillStyle = '#fff'
  // 绘制填充文字
  ctx.value.fillText('刮刮卡', 180, 50)
})
</script>
<template>
  <div>canvas</div>
  <div><a href="https://mp.weixin.qq.com/s/bOBXmHyXvHHnvyuzAiEFDw">更多</a></div>
  <div class="relative inline-block">
    <canvas
      ref="canvas"
      width="400"
      height="100"
      @mousedown="onmousedown"
      @mousemove="onmousemove"
    ></canvas>

    <div
      class="absolute top-1/2 left-1/2 transform translate-1/2 text-xl text-red-600 font-bold -z-1"
    >
      恭喜您获得100w
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
