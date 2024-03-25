<template>
  <div class="likeBtn relative" ref="likeBtn" @click="addHearts">
    <span
      :class="{
        heartPop: fatherHover,
        'bg-[#e7273f]': props.modelValue,
        'bg-gray-500': !props.modelValue
      }"
      class="heart"
      ref="heart"
    ></span>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  modelValue: Boolean
})
const emits = defineEmits(['update:modelValue'])

const likeBtn = ref()
const heart = ref()

const loop = ref(null)
const fatherHover = ref(false)

function addHearts() {
  emits('update:modelValue', !props.modelValue)

  if (props.modelValue) {
    return
  }
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const fullHeart = document.createElement('div')
      fullHeart.classList.add('hearts')
      fullHeart.innerHTML = '<span class="heart"></span>'
      fullHeart.style.left = Math.random() * 100 + '%'
      fullHeart.style.top = Math.random() * 100 + '%'
      fullHeart.style.transform = `translate(-50%, -50%) scale(${Math.random() + 0.3}) `
      fullHeart.style.animationDuration = Math.random() * 2 + 3 + 's'
      fullHeart.firstChild.style.backgroundColor = '#ed3056'
      likeBtn.value.appendChild(fullHeart)
      setTimeout(() => {
        fullHeart.remove()
      }, 3000)
    }, i * 100)
  }
}
// function touchStart() {
//   if (loop.value) {
//     clearTimeout(loop.value) //再次清空定时器，防止重复注册定时器
//   }
//   loop.value = setTimeout(() => {
//     addHearts()
//   }, 3000)
// }

// function touchEnd() {
//   clearTimeout(loop.value)
// }
onMounted(() => {
  likeBtn.value.addEventListener('mousemove', () => {
    fatherHover.value = true
  })
  likeBtn.value.addEventListener('mouseout', () => {
    fatherHover.value = false
  })
})
</script>
<style lang="scss">
.bg-red {
  background-color: #e7273f;
}
.likeBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;
}
.heart {
  height: 13px;
  width: 13px;
  transform: rotate(-45deg) scale(1);
  display: inline-block;
}
.heart::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 0;
  background-color: inherit;
  border-radius: 50%;
  height: 13px;
  width: 13px;
}
.heart::after {
  content: '';
  position: absolute;
  top: 0;
  right: -50%;
  background-color: inherit;
  border-radius: 50%;
  height: 13px;
  width: 13px;
}
.heartPop {
  animation: pulse 1s linear infinite;
}
@keyframes pulse {
  0% {
    transform: rotate(-45deg) scale(1);
  }
  10% {
    transform: rotate(-45deg) scale(1.1);
  }
  20% {
    transform: rotate(-45deg) scale(0.9);
  }
  30% {
    transform: rotate(-45deg) scale(1.2);
  }
  40% {
    transform: rotate(-45deg) scale(0.9);
  }
  50% {
    transform: rotate(-45deg) scale(1.1);
  }
  60% {
    transform: rotate(-45deg) scale(0.9);
  }
  70% {
    transform: rotate(-45deg) scale(1);
  }
}
.hearts {
  position: absolute;
  color: #e7273f;
  font-size: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fly 3s linear forwards;
}
@keyframes fly {
  to {
    transform: translate(-50%, -50px) scale(0);
  }
}
</style>
