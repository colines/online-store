<template>
  <!-- 右边导航栏 -->
  <div class="right-nav">
    <ul>
      <li class="nav-li" v-for="list in navList" :key="list.id" v-on:mouseover="changeActive(list.id)" v-on:mouseout="removeActive(list.id)"
        @click="changeUrl(list.url)">
        <span :class="index === list.id ? infoActive : info">{{list.info}}</span>
        <span class="iconfont" :class="index === list.id ? iconfontActive : ''" v-html="list.code">&#xe653;</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        infoFlag: false,
        index: '',
        infoActive: 'infoActive',
        iconfontActive: 'iconfontActive',
        info: 'info',
        iconfont: 'iconfont',
        navList: [{
            id: 0,
            info: "我的订单",
            code: "&#xe653;",
            url: '/order'
          },
          {
            id: 1,
            info: "购物车",
            code: "&#xe602;",
            url: '/cart'
          },
          {
            id: 2,
            info: "反馈",
            code: "&#xe651;",
            url: ''
          },
          {
            id: 3,
            info: "回到顶部",
            code: "&#xe62c;",
            url: '',
          }
        ]
      }
    },
    methods: {
      changeActive(index) { //鼠标移上去展示商标意思
        this.index = index;
        this.infoFlag = true;
      },
      removeActive(index) { //鼠标移除展示商标意思
        this.index = '';
        this.infoFlag = false;
      },
      goTop() { //回到顶部
        var timer = null;
        timer = setInterval(function () {
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if (osTop == 0) {
            clearInterval(timer);
          }
        }, 30)
      },
      changeUrl(url) { //根据路径跳转页面
        if (url) {
          var user = JSON.parse(localStorage.getItem('myUser') || '[]');
          if (user.upwd) {
            this.$router.push(url);
          } else {
            let routeData = this.$router.resolve("/login");
            window.open(routeData.href, '_blank');
          }
        } else {
          this.goTop();
        }
      }

    },

  }

</script>
<style scoped>
  .right-nav {
    height: 240px;
    position: fixed;
    right: 10px;
    bottom: 100px;
    z-index: 99;
  }

  .nav-li {
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    color: #fff;
    margin-bottom: 5px;
    text-align: center;
    cursor: pointer;
  }

  .info {
    float: left;
    width: 64px;
    text-align: center;
    display: none;
  }

  .iconfont {
    float: right;
    width: 34px;
    text-align: center;
    background: #7a6e6e;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .infoActive {
    float: left;
    width: 64px;
    text-align: center;
    display: block;
    background: #FF4466;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transition: ease 2s;
  }

  .iconfontActive {
    float: right;
    width: 34px;
    text-align: center;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background: #FF4466;
  }

</style>
