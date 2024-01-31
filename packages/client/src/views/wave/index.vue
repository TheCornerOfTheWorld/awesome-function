<template>
  <div
    class="box"
    data-v-wave-boundary="true"
    cursorshover="true"
    style="position: relative"
    data-v-wave-count-internal="1"
    @click="clickBox"
  >
    <div
      style="
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        border-radius: 0px;
        overflow: hidden;
        pointer-events: none;
        /* safari */
        -webkit-mask-image: -webkit-radial-gradient(center, white, black);
      "
    >
      <div
        class="wave"
        ref="wave"
        style="
          --square: 333px;
          position: absolute;
          width: var(--square);
          height: var(--square);
          top: 97.6875px;
          left: 129.525px;
          background: radial-gradient(closest-side, rgb(255, 255, 255), rgb(28, 184, 132));
          border-radius: 50%;
          opacity: 0.3;
          transform: translate(-50%, -50%) scale(0);
          transition:
            transform 2s cubic-bezier(0, 0.57, 0.89, 0) 0s,
            opacity 2s cubic-bezier(0, 0.57, 0.89, 0) 0s;
        "
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const wave = ref('')
function clickBox() {
  requestAnimationFrame(() => {
    setTimeout(() => {
      wave.value.style.transform = 'translate(-50%, -50%) scale(0)'
    }, 2000)
    wave.value.style.transform = 'translate(-50%, -50%) scale(1)'
    console.log('🚀 ~ clickBox ~ wave:', wave.value)
  })
}
</script>
<style scoped>
.box {
  display: grid;
  place-items: center;
  width: 200px;
  height: 200px;
  padding: 16px;
  box-shadow: 0 4px 24px #00000026;
}
</style>
