<!-- https://www.zhangxinxu.com/wordpress/2018/05/image-sequence-html5-video-play/ -->
<!-- https://blog.csdn.net/weixin_43969585/article/details/127320317 -->
<!-- https://zhuanlan.zhihu.com/p/31379191 -->
<script setup lang="ts">
defineOptions({
  name: 'ScrollAlternately'
})
</script>
<template>
  <section class="g-img1">IMG1</section>
  <section class="g-img2">IMG2</section>
  <section class="g-img3">IMG3</section>
</template>
<style lang="scss" scoped>
$img1: 'http://pic7.photophoto.cn/20080407/0034034859692813_b.jpg';

$img2: 'http://up.enterdesk.com/edpic_source/21/00/00/210000f8e772d7fc0758e67ae4b48807.jpg';

$img3: 'https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=';

section {
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  line-height: 100vh;
  text-align: center;
  font-size: 20vh;
}

.g-img1 {
  background-image: url($img1);
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
}

.g-img2 {
  background-image: url($img2);
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
}

.g-img3 {
  background-image: url($img3);
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
}
</style>
