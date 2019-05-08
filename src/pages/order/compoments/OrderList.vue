<template>
  <div class="order-right">
    <div class="order-title" v-show="this.$store.state.orderFlag">
      <ul>
        <li class="product">商品信息</li>
        <li class="">单价(元)</li>
        <li class="">数量</li>
        <li class="">实付款(元)</li>
        <li class="">交易状态</li>
        <li class="">操作</li>
      </ul>
    </div>
    <div class="order-list" v-for="(order,index) in orderList" :key="order.outTradeNo">
      <div class="list-header">
        <div class="list-left">
          <span>订单编号： </span><span>{{order.outTradeNo}}</span>
        </div>
        <div class="list-left">
          <span>成交时间： </span><span>{{order.createTime}} </span>
        </div>
      </div>
      <div class="list-body" v-for="item in order.relates">
        <ul>
          <li class="book-info">
            <div class="book-img">
              <img :src="Img + item.headImg" alt="">
            </div>
            <div class="book-desc">
              <p class="book-name">{{item.ptitle}}</p>
            </div>
          </li>
          <li class="price">￥{{item.pprice/100*0.75}}</li>
          <li class="num">{{item.amount}}</li>
          <li class="sum">￥{{item.amount * item.pprice/100*0.75}}</li>
          <li>{{status[order.status].info}}</li>
          <li class="status" @click="operator(order.status,order.outTradeNo,index)"><span>{{statusChange[order.status].btn}}</span></li>
        </ul>
      </div>
      <div class="address-section">
        <ul>
          <li>收货人：{{order.address.name}}</li>
          <li class="section-addr">收货地址：{{order.address.position}}</li>
          <li>联系电话：{{order.address.phone}}</li>
          <li class="delOrder"><span @click="orderDel(order.outTradeNo,index)" v-show="order.status==0 || order.status == 3">删除订单</span></li>
        </ul>
      </div>
    </div>
    <div class="orderInfo" v-show="!this.$store.state.orderFlag">
      <span class="iconfont order-icon">&#xe653;</span>
      <span class="info">您还无此类的订单</span>
      <span class="reminder">
        去<router-link to="/">商城</router-link>首页逛逛吧
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["orderList"],
    data() {
      return {
        orderFlag:true,
        status: [{
            info: '待付款'
          },
          {
            info: '待发货'
          },
          {
            info: '待收货'
          },
          {
            info: '已收货'
          }
        ],
        statusChange: [{
            btn: '付款'
          },
          {
            btn: '延迟发货'
          },
          {
            btn: '确认收货'
          },
          {
            btn: '评价'
          }
        ]
      }
    },
    methods: {
      orderDel(outTradeNo, index) {
        this.axios.post(this.Home + '/api/v1/order/cancelOrder?outTradeNo=' + outTradeNo).then((res) => {
          if (res.data.data) {
            this.orderList.splice(index, 1);
          } else {
            let user = JSON.parse(localStorage.getItem('myUser') || '[]');
            user.upwd = '';
            this.$router.push('/login');
          }
        })
      },
      operator(status, outTradeNo, index) {
        if (status == 0) {
          let relates = this.orderList[index].relates;
          let total = 0;
          for (let i = 0; i < relates.length; i++) {
            total += relates[i].amount * relates[i].pprice / 100 * 0.75;
          }
          let item = {
            total: total,
            sno: outTradeNo
          }
          sessionStorage.setItem('item', JSON.stringify(item));
          this.$router.push('/pay');
        } else if (status == 1) {
          alert("此功能还没实现")
        } else if (status == 2) {
          this.axios.post(this.Home + '/api/v1/order/received?outTradeNo=' + outTradeNo).then((res) => {
            console.log(res);
            if (res.data.data) {
              this.orderList.splice(index, 1);
              alert("已确认收货")
            } else {
              let user = JSON.parse(localStorage.getItem('myUser') || '[]');
              user.upwd = '';
              this.$router.push('/login');
            }
          })
        } else {
          alert("此功能还没实现")
        }
      }
    },

  }

</script>

<style scoped>
  .order-right {
    float: left;
    width: 1040px;
    margin-left: 20px;
  }

  .order-title {
    width: 1040px;
    height: 40px;
    line-height: 40px;
  }

  .order-title ul li {
    float: left;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    background: #FAFAFA;
  }

  .product {
    width: 440px !important;
  }

  .order-list {
    width: 1040px;
    margin-top: 30px;
    border: 1px solid #eee;
  }

  .list-header {
    height: 40px;
    line-height: 40px;
    background: #F4F4F4;
  }

  .list-body {
    height: 120px;
    line-height: 120px;
  }

  .list-left {
    float: left;
    color: #666;
    margin-left: 20px;
  }

  .list-body ul li {
    float: left;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .book-info {
    width: 440px !important;
  }

  .book-img img {
    float: left;
    width: 80px;
    height: 80px;
    margin-top: 20px;
    margin-left: 60px;
  }

  .book-desc {
    float: left;
    font-size: 12px;
    color: #333;
    width: 300px;
    margin-left: -30px;
  }

  .book-desc p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
    width: 300px;
    height: 25px;
    line-height: 25px;
    text-align: left;
    margin-left: 50px;
  }

  .book-name {
    color: #333 !important;
    margin-top: 45px;
  }

  .status {
    color: #f00;
    font-weight: bold;
    cursor: pointer;
  }

  .address-section {
    width: 1040px;
    height: 50px;
    line-height: 50px;
    background: #FAFAFA;
  }

  .address-section ul li {
    float: left;
    width: 200px;
    text-align: center;
    color: #333;
  }

  .delOrder {
    float: right !important;
    color: #25a4bb !important;
  }

  .section-addr {
    width: 400px !important;
  }

  .status {
    color: #f00;
  }

  .statusClass {
    cursor: pointer;
  }

  .delOrder {
    color: #25a4bb;
  }

  .delOrder span {
    cursor: pointer;
  }

  .orderInfo {
    width: 800px;
    height: 150px;
    margin-left: 300px;
    margin-top: 100px;
  }

  .order-icon {
    float: left;
    font-size: 100px;
    color: #FF4567;
  }

  .info {
    float: left;
    font-size: 16px;
    font-weight: bold;
    width: 400px;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    margin-left: 20px;
  }

  .reminder {
    float: left;
    width: 400px;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    margin-left: 20px;
  }

  .reminder a {
    color: #ff5777;
  }

</style>
