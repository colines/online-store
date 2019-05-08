<template>
  <div class="buy">
    <header-top></header-top>
    <header-wrap></header-wrap>
    <book-buy></book-buy>
    <right-nav></right-nav>
  </div>
</template>

<script>
  import HeaderTop from '../common/compoments/HeaderTop';
  import HeaderWrap from '../common/compoments/HeaderWrap';
  import RightNav from '../common/compoments/RightNav';
  import BookBuy from '../buy/compoments/BookBuy';
  export default {
    components: {
      "header-top": HeaderTop,
      "header-wrap": HeaderWrap,
      "book-buy": BookBuy,
      "right-nav": RightNav,
    }

  }

</script>

<style scoped>

</style>
