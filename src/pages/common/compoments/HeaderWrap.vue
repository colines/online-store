<template>
  <!-- 中间搜索框 -->
  <div class="header-wrap">
    <div class="wrap">
      <div class="logo" @click="goHome"><span class="iconfont iconfont-logo">&#xe60e;</span><span class="store">书 城</span></div>
      <div class="search-nav">
        <div class="search-content">
          <div class="search">
              <span class="iconfont iconfont-search">&#xe678;</span>
              <input type="text" class="search-form" v-model="keyWords" placeholder="关键词" maxlength="50" @keyup.enter="search">
              <button type="button" class="btn-search" @click="search">搜&nbsp;索</button>
          </div>
        </div>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keyWords: '',
      }
    },
    methods: {
      goHome() {
        this.$router.push('/');
      },
      search() {
        this.$store.commit('setKeyWords',this.keyWords);
        this.$router.push("/search");
        },
      }
    }

</script>

<style scoped>
  .header-wrap {
    width: 100%;
    min-width: 1200px;
  }

  .wrap {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
  }

  .search-nav {
    margin-left: 70px;
    width: 700px;
    height: 76px;
    float: left;
  }

  .search-content {
    height: 44px;
    line-height: 100px;
    margin-top: 32px;
    margin-left: 100px;
    position: relative;
  }

  .search {
    width: 600px;
    height: 44px;
    border-radius: 6px;
    background: #F7F7F7;
  }

  .iconfont-search {
    float: left;
    width: 20px;
    height: 44px;
    line-height: 44px;
    padding-left: 15px;
    font-size: 16px;
  }

  .search-form {
    float: left;
    width: 500px;
    border-radius: 6px;
    overflow: hidden;
    height: 44px;
    line-height: 44px;
    border: none;
    color: #999;
    font-size: 12px;
    background: #F7F7F7;
    width: 420px;
    padding-left: 3px;
  }

  .btn-search {
    float: right;
    width: 55px;
    height: 44px;
    color: #fff;
    background: #8D8D8D;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
  }

</style>
