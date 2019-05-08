<template>
  <div class="pay-money">
    <div class="pay-logo">
      <router-link class="logo" to="/" tag="div"><span class="iconfont iconfont-logo">&#xe60e;</span><span class="store">书
          城</span></router-link>
    </div>
    <div class="pay-content">
      <div class="pay-price">
        <p class="fl">
          <span>支付金额：</span><span class=price>￥{{total}}</span>
        </p>
        <p class="fl">
          <span>订单号：</span><span class="sno">{{sno}}</span>
        </p>
      </div>
      <div class="pay-way">
        <h1>支付方式</h1>
        <div class="way-img">
          <img src="http://112.74.39.181:1453/img/WePayLogo.png" alt="">
        </div>
        <button class="pay-btn" @click="getSecondCode">立即支付</button>
      </div>

      <div class="info" v-if="infoFlag">
        <p>
          <span class="pay-success">支付成功</span>
          <span>返回
            <router-link to="/" tag="a">首页</router-link>
          </span>
        </p>
      </div>
    </div>
    <div class="second-code" v-if="codeFlag">
      <img :src="mysrc" alt="付款二维码">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        codeFlag: false,
        infoFlag: false, //付款成功后信息提示
        total: '', //总价
        sno: '', //订单号
        mysrc: '', //二维码地址
        payFlag: false, //付款标志
      }
    },
    created() {
      this.getItem();
    },
    methods: {
      getItem() {
        let item = JSON.parse(sessionStorage.getItem('item') || '[]'); //获取付款商品的信息
        if (item.total && item.sno) {
          this.total = item.total;
          this.sno = item.sno;
        } else {
          this.$router.push('/');
        }
      },
      getSecondCode() {
        var this_ = this;
        this.axios.get(this.Home + '/api/v1/order/wechat/code?outTradeNo=' + this_.sno).then((res) => {
          if (res.data) {
            this_.mysrc = this_.Home + '/api/v1/order/wechat/code?outTradeNo=' + this_.sno;
            this_.codeFlag = true; //二维码生成
            var timer = null;
            timer = setInterval(function () { //轮询检查是否付款
              this_.whetherOrNotToPay();
              if (this_.payFlag) {
                clearInterval(timer);
                this_.codeFlag = false;
                this_.infoFlag = true;
              }
            }, 2000)
          }
        })
      },
      whetherOrNotToPay() { //查询订单号是否付款
        this.axios.post(this.Home + '/api/v1/order/whetherOrNotToPay?outTradeNo=' + this.sno).then((res) => {
          if (res.data.data) {
            this.payFlag = true; //付款成功
          }
        })
      }

    },
  }

</script>

<style scoped>
  .pay-logo {
    width: 1010px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
    border-bottom: 3px solid #FF4466;
  }

  .pay-content {
    width: 1010px;
    margin: 0 auto;
  }

  .pay-price {
    margin-top: 20px;
    height: 60px;
    background: #f5f5f5;
  }

  .pay-price p {
    float: left;
    display: block;
    width: 500px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #333;
  }

  .price {
    color: #FF4466;
    font-size: 22px;
  }

  .sno {
    color: #1a66b3;
  }

  .pay-way {
    margin-top: 40px;
  }

  .pay-way h1 {
    color: #333;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .way-img {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    border: 1px solid #eaeaea;
  }

  .way-img img {
    width: 80%;
  }

  .pay-btn {
    margin-top: 40px;
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    background: #ff2832;
    border-radius: 3px;
    cursor: pointer;
  }

  .info {
    margin-left: 400px;
  }

  .info p {
    font-size: 18px;
    height: 30px;
    line-height: 30px;
  }

  .info span {
    margin-right: 10px;
  }

  .pay-success {
    color: #ff2832;
  }

  .second-code {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    border: 1px solid #ccc;
  }

  .second-code img {
    width: 100%;
  }

</style>
