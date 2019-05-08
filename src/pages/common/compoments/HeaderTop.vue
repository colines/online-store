<template>
  <!-- 顶部栏 -->
  <div class="header-top">
    <div class="header-left">
      <p>欢迎来到网上书城</p>
      <p v-if="userFlag" v-text="nickName" class="nickName"></p>
      <p v-if="userFlag"><span class="middle">|</span><span @click="logout" class="logout">注销</span></p>
      <router-link to="/login" tag="a" v-if="!userFlag">请登录</router-link>
      <router-link to="/register" tag="a" v-if="!userFlag">免费注册</router-link>
    </div>
    <div class="header-right">
      <ul>
        <li @click="goOrder"><span class="iconfont">&#xe653;</span>我的订单</li>
        <li @click="goCart"><span class="iconfont">&#xe602;</span>我的购物车 <span class="count" v-if="userFlag">{{this.$store.state.count}}</span></li>
        <li><span class="iconfont">&#xe673;</span>关于我们</li>
        <li><span class="iconfont">&#xe62d;</span>客户热线：400-999999</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      var user = JSON.parse(localStorage.getItem('myUser') || '[]');
      if (user.uemail && user.upwd) {
        this.userFlag = true;
        this.nickName = user.uname;
      }
      var list = JSON.parse(localStorage.getItem('list') || '[]'); //获取购物车
      this.$store.commit('setCount', list.length);
    },
    data() {
      return {
        userFlag: false,
        nickName: '',
      }
    },
    methods: {
      logout() {
        var this_ = this;
        this.axios.post(this.Home + '/api/v1/user/logout').then((res) => {
          if (res.data) {
            this_.$store.commit('setCount', 0);
            this_.userFlag = false;
            let user = JSON.parse(localStorage.getItem('myUser') || '[]');
            user.upwd = '';
            localStorage.setItem('myUser', JSON.stringify(user));
          }
        })
      },
      goOrder() {
        var user = JSON.parse(localStorage.getItem('myUser') || '[]');
        if (!user.upwd) {
          let routeData = this.$router.resolve("/login");
          window.open(routeData.href, '_blank');
        }else{
          this.$router.push('/order');
        }
      },
      goCart() {
        var user = JSON.parse(localStorage.getItem('myUser') || '[]');
        if (!user.upwd) {
          let routeData = this.$router.resolve("/login");
          window.open(routeData.href, '_blank');
        }else{
          this.$router.push('/cart');
        }
      },
    }
  }

</script>

<style scoped>
  .header-top {
    width: 1000px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    position: relative;
  }

  .header-left {
    width: 250px;
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    overflow: hidden;
  }

  .header-left p {
    float: left;
    line-height: 30px;
    margin-right: 10px;
  }

  .nickName {
    color: #FF4466;
    font-size: 16px;
  }

  .middle {
    float: left;
    margin-right: 10px;
  }

  .logout {
    float: left;
    color: #25bb9b;
    cursor: pointer;
  }

  .header-left a {
    float: left;
    margin-right: 6px;
  }

  .header-right {
    float: right;
    height: 30px;
  }

  ul li {
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }

  ul li:hover {
    color: #FF4466;
  }

  .iconfont {
    font-size: 14px;
    color: #FF4466;
    margin-right: 5px;
  }

  .count {
    color: #FF4466;
  }

</style>
