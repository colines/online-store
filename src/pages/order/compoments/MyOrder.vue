<template>
  <div class="my-order">
    <!-- 左边导航 -->
    <div class="order-left">
      <div class="mu-nav">
        <div class="left-nav">
          <div class="nav" @click="showOrhide" :class="itemFlag == true ? noBorderClass : ''">
            <span>我的订单</span>
            <span class="iconfont" v-show="!itemFlag">&#xe63f;</span>
            <span class="iconfont" v-show="itemFlag">&#xe776;</span>
          </div>
          <div class="nav-item" v-show="itemFlag">
            <ul v-for="item in itemList" :key="item.itemIndex">
              <li @click="doFun(item.itemIndex)" :class="item.itemIndex == index ? itemClass :''">
                <span>{{item.content}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="left-nav">
          <div class="nav" :class="itemFlag == true ? haveBorderClass :''" @click="goAddress">
            <span>地址管理</span>
            <span class="iconfont">&#xe63f;</span>
          </div>
        </div>
        <div class="left-nav">
          <div class="nav" @click="goPassword">
            <span>密码管理</span>
            <span class="iconfont">&#xe63f;</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边导航内容 -->
    <router-view :orderList="orderList"></router-view>
    <!-- <order-right :orderList="orderList"></order-right> -->
    <div class="clear-fix"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
  import OrderRight from './OrderList'
  export default {
    components: {
      "order-right": OrderRight,
    },
    created() {
      var user = JSON.parse(localStorage.getItem('myUser') || '[]');
      if (!user.upwd) {
        let routeData = this.$router.resolve("/login");
        window.open(routeData.href, '_blank');
      }
      this.getOrders(0);
    },
    data() {
      return {
        itemClass: 'itemClass',
        haveBorderClass: 'haveBorderClass',
        noBorderClass: 'noBorderClass',
        index: 1,
        orderList: [],
        itemFlag: true,
        outTradeNo: [],
        itemList: [{
            itemIndex: 1,
            content: '待付款'
          },
          {
            itemIndex: 2,
            content: '待发货'
          },
          {
            itemIndex: 3,
            content: '待收货'
          },
          {
            itemIndex: 4,
            content: '已收货'
          },
        ]
      }
    },
    methods: {
      showOrhide() { //点击我的订单出现列表
        this.itemFlag = !this.itemFlag;
        this.$router.push('/order')
      },
      doFun(index) { //根据点击导航执行发起不同请求
        switch (index) {
          case 1:
            this.noPay();
            break;
          case 2:
            this.hadPay();
            break;
          case 3:
            this.noReceive();
            break;
          case 4:
            this.hadReceive();
            break;
        }

      },
      goAddress() {
        this.$router.push('/order/address');
      },
      goPassword() {
        this.$router.push('/order/password');
      },
      noPay() { //未付款/api/v1/order/getOrders
        this.$router.push('/order');
        this.itemFlag = true;
        this.index = 1
        this.getOrders(0);
      },
      hadPay() { //待发货
        this.$router.push('/order');
        this.itemFlag = true;
        this.index = 2
        this.getOrders(1);
      },
      noReceive() { //待收货
        this.$router.push('/order');
        this.itemFlag = true;
        this.index = 3
        this.getOrders(2);
      },
      hadReceive() { //已收货
        this.$router.push('/order');
        this.itemFlag = true;
        this.index = 4
        this.getOrders(3);
      },
      getOrders(status) {
        this.orderList = [];
        this.axios.post(this.Home + '/api/v1/order/getOrders?status=' + status).then((res) => {
          if (res.data.data) {
            let data = res.data.data;
            if (data.length) {
              this.$store.commit('setOrderFlag', true);
              for (let i = 0; i < data.length; i++) {
                let outTradeNo = data[i].outTradeNo;
                this.getOrder(outTradeNo, status);
              }
            } else {
              this.$store.commit('setOrderFlag', false);
            }
          } else {
            let user = JSON.parse(localStorage.getItem('myUser') || '[]');
            user.upwd = '';
            this.$router.push('/login');
          }
        })
      },
      getOrder(sno, status) {
        this.axios.post(this.Home + '/api/v1/order/getOrder?outTradeNo=' + sno).then((res) => {
          if (res.data.data) {
            this.orderList.push(res.data.data);
            this.orderList.status = status;
          }

        })
      }
    },

  }

</script>

<style scoped>
  .my-order {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .order-left {
    float: left;
    width: 140px;
    background: #FAFAFA;
  }

  .mu-nav {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .left-nav {
    cursor: pointer;
  }

  .iconfont {
    font-size: 12px;
  }

  .nav {
    width: 100px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    border-bottom: 1px solid #e1e1e1;
    margin-left: 20px;
  }

  .nav-item {
    width: 140px;
    margin-left: 20px;
  }

  .nav-item ul li {
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }

  .nav-item ul li:hover {
    color: #f00;
  }

  .itemClass {
    color: #f00 !important;
  }

  .noBorderClass {
    border: none;
  }

  .haveBorderClass {
    border-top: 1px solid #e1e1e1;
  }

  .footer {
    height: 50px;
  }

</style>
