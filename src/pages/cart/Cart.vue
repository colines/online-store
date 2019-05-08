<template>
  <div class="cart">
    <header-top></header-top>
    <header-wrap></header-wrap>
    <right-nav></right-nav>
    <book-show></book-show>
  </div>
</template>

<script>
  import HeaderTop from '../common/compoments/HeaderTop';
  import HeaderWrap from '../common/compoments/HeaderWrap';
  import RightNav from '../common/compoments/RightNav';
  import BookShow from './compoments/BookShow'
  export default {
    components: {
      "header-top": HeaderTop,//顶部组件
      "header-wrap": HeaderWrap,//中间搜索框
      "right-nav":RightNav,//右边导航栏组件
      "book-show":BookShow//商品展示组件
    }

  }

</script>

<style scoped>

</style>
