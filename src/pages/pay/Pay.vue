<template>
  <div class="pay">
    <header-top></header-top>
    <pay-money></pay-money>
  </div>
</template>

<script>
  import HeaderTop from '../common/compoments/HeaderTop';
  import PayMoney from './compoments/PayMoney'
  export default {
    components: {
      "header-top": HeaderTop,
      "pay-money": PayMoney
    },
  }

</script>

<style scoped>

</style>
