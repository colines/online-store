<template>
  <!-- 轮播图组件 -->
  <div class="wraper">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for=" item in list" :key='item.url'>
        <img class="swiper-img" :src="item.url" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'

  export default {
    props: ['list'],
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          autoplay: 3000,
          speed: 1000,
          loop: true,
        }
      }
    },
  }

</script>

<style scoped>
  .wrapper>>>.swiper-pagination-bullet-active {
    background: #fff;
  }

  .swiper-img {
    width: 100%;
  }

</style>
