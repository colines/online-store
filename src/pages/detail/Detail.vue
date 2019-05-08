<template>
  <div class="detail">
    <header-top></header-top>
    <header-wrap></header-wrap>
    <book-info></book-info>
    <right-nav></right-nav>
  </div>
</template>
<script>
  import HeaderTop from '../common/compoments/HeaderTop';
  import HeaderWrap from '../common/compoments/HeaderWrap';
  import RightNav from '../common/compoments/RightNav';
  import BookInfo from '../detail/compoments/BookInfo';
  export default {
    components: {
      "header-top": HeaderTop,
      "header-wrap": HeaderWrap,
      "book-info":BookInfo,
      "right-nav":RightNav,
    }
  }

</script>

<style scoped>

</style>
