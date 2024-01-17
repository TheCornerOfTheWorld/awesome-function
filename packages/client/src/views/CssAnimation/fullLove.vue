<template>
  <div class="likeBtn" id="likeBtn">
    <span class="heart" id="heart" @click="addHearts"></span>
  </div>
</template>
<script>
export default {
  mounted() {
    const likeBtn = document.getElementById('likeBtn')
    const heart = document.getElementById('heart')
    likeBtn.addEventListener('mousemove', () => {
      heart.classList.add('heratPop')
    })
    likeBtn.addEventListener('mouseout', () => {
      heart.classList.remove('heratPop')
    })
  },
  methods: {
    addHearts() {
      const content = document.getElementById('likeBtn')
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
          content.appendChild(fullHeart)
          setTimeout(() => {
            fullHeart.remove()
          }, 3000)
        }, i * 100)
      }
    }
  }
}
</script>
<style>
.heart {
  background-color: #8a93a0;
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
.heratPop {
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
