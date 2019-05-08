<template>
  <div class="order">
    <header-top></header-top>
    <header-wrap></header-wrap>
    <right-nav></right-nav>
    <my-order></my-order>
  </div>
</template>

<script>
  import HeaderTop from '../common/compoments/HeaderTop';
  import HeaderWrap from '../common/compoments/HeaderWrap';
  import RightNav from '../common/compoments/RightNav';
  import MyOrder from '../order/compoments/MyOrder';
  export default {
    components: {
      "header-top": HeaderTop, //顶部组件
      "header-wrap": HeaderWrap, //中间搜索框
      "right-nav": RightNav, //右边导航栏组件
      "my-order": MyOrder //我的订单

    }
}

</script>

<style scoped>

</style>