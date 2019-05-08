<template>
  <div class="search">
    <header-top></header-top>
    <search></search>
    <right-nav></right-nav>
  </div>
</template>

<script>
  import HeaderTop from '../common/compoments/HeaderTop';
  import RightNav from '../common/compoments/RightNav';
  import Search from './compoments/search'
  export default {
    components: {
      "header-top": HeaderTop,
      "search": Search,
      "right-nav": RightNav,
    }
  }

</script>

<style scoped>

</style>
