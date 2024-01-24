<template>
  <div>新手指引</div>
  <a class="introduction-farm" href="http://google.com/" data-intro="Hello step one!">测试</a>
</template>

<script setup>
// import intro from './intro'
import { onMounted } from 'vue'

onMounted(() => {
  // intro.setOptions({
  //   stops: [
  //     {
  //       element: '#username',
  //       intro: '用户',
  //       position: 'top'
  //     }
  //   ]
  // })
  // nextTick(() => {
  //   intro.start()
  //   intro.onexit(() => {
  //     console.log('end')
  //   })
  // })
  console.log(introJs, 'introJs')
  introJs().start()
})
</script>
<style></style>
