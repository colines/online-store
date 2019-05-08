<template>
  <div class="book-buy">
    <div class="addr-div" v-show="addrDivFlag">
      <h1 class="pinfo">收货人信息</h1>
      <div class="addr-list" v-for="(addr,index) in addressList" :key="addr.aid" @click="changeAddr(index)">
        <ul>
          <li class="addr-li" :class="addrIndex == index ? addrClass: ''">
            <h1 class="addr-header">
              <span v-text="addr.name"></span>
              <span class="tel" v-text="addr.phone"></span>
            </h1>
            <p class="addr" v-text="addr.position"></p>
          </li>
        </ul>
      </div>
      <div class="clear-fix"></div>
    </div>
    <button class="address-btn" @click="addAddress">
      <span class="iconfont">&#xe621;</span>
      <span>添增收货地址</span>
    </button>
    <div class="address-wrapper" v-show="addressFlag">
      <p class="address-name address-style">
        <span class="name">收货人： <i class="start">*</i></span>
        <span class="name-input">
          <input type="text" class="text" v-model="name">
        </span>
      </p>
      <p class="address-name address-style">
        <span class="name">电话号码： <i class="start">*</i></span>
        <span class="name-input">
          <input type="text" class="text" v-model="tel">
        </span>
      </p>
      <p class="address-name address-style">
        <span class="name">收货地址： <i class="start">*</i></span>
        <textarea class="textarea" cols="90" rows="4" v-model="address"></textarea>
      </p>
      <div class="clear-fix"></div>
      <p class="address-name address-style">
        <button class="sure-btn btn" @click="sureAddress">确认地址</button>
        <button class="cancel-btn btn" @click="cancel">取消</button>
      </p>
    </div>
    <div class="pro-div">
      <h1 class="pinfo">商品清单</h1>
      <div class="pro-order">
        <div class="pro-wrap">
          <ul>
            <li class="book-info">
              <span>商品信息</span>
            </li>
            <li>
              <span>单价</span>
            </li>
            <li>
              <span>数量</span>
            </li>
            <li>
              <span>总价</span>
            </li>
          </ul>
        </div>
        <div class="pro-list" v-for="item in itemList">
          <ul>
            <li class="book-info">
              <div class="book-img">
                <img :src="Img + item.headImg" alt="">
              </div>
              <div class="book-desc">
                <p class="book-name" v-text="item.ptitle"></p>
                <p>
                  <span>作者：</span><span class="author" v-text="item.pprovider"></span>
                </p>
                <p>
                  <span>出版社：</span><span v-text="item.pfirm"></span>
                </p>
              </div>
            </li>
            <li>
              <span class="price" v-text="'￥' + item.pprice/100*0.75"></span>
            </li>
            <li>
              <span class="bun" v-text="item.num"></span>
            </li>
            <li>
              <span class="sum" v-text="'￥' + item.num * item.pprice/100*0.75"></span>
            </li>
          </ul>
        </div>
        <div class="footer-box">
          共<span class="footer-num" v-text="count"></span>件商品
          <span class="pay-size">应付金额：<span class="footer-price" v-text="total"></span></span>
          <button class="pay-btn" @click="payMoney">去支付</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addrClass: 'addrClass',
        addrIndex: 0,
        addressFlag: false, //是否显示地址填写
        name: '',
        tel: '',
        address: '',
        aid: '',
        pids: [], //保存商品的id
        pamount: [], //保存商品的数量
        addrDivFlag: true, //是否展示收货人信息
        addressList: [], //地址列表
        itemList: [], //商品列表
        count: 0, //商品数
        total: 0, //总计
        pids: [],
        pamount: [],
      }
    },
    created() {
      this.getAllAddr();
      this.getitemList();
    },
    methods: {
      setTotal() {
        for (let i = 0; i < this.count; i++) {
          this.total += this.itemList[i].num * this.itemList[i].pprice / 100 * 0.75;
          this.pids.push(this.itemList[i].pid);
          this.pamount.push(this.itemList[i].num)
        }
      },
      getitemList() { //获取购买商品的列表
        this.itemList = JSON.parse(sessionStorage.getItem('itemList') || '[]');
        this.count = this.itemList.length;
        this.setTotal();
      },
      changeAddr(index) { //改变地址
        this.addrIndex = index;
        this.aid = this.addressList[index].aid;
      },
      addAddress() {
        this.addressFlag = !this.addressFlag;

      },
      sureAddress() { //增加地址
        let user = JSON.parse(localStorage.getItem('myUser') || '[]');
        let address = this.$qs.stringify({
          uemail: user.uemail,
          name: this.name,
          phone: this.tel,
          position: this.address
        });
        var this_ = this;
        this.axios.post(this.Home + '/api/v1/user/addAddr', address).then((res) => {
          if (res.data) {
            this_.name = this_.tel = this_.address = '';
            this_.addressFlag = false;
            this_.getAllAddr();
          }
        })

      },
      cancel() {
        this.name = this.tel = this.address = '';
        this.addressFlag = false;
      },
      getAllAddr() { //获取所有地址
        var this_ = this;
        this.axios.post(this.Home + '/api/v1/user/getAllAddr').then((res) => {
          console.log(res);
          if (res.data.data) {
            if (res.data.data.length) {
              this_.addressList = res.data.data;
              this_.addrDivFlag = true; //展示收货人信息
              this_.aid = this_.addressList[0].aid;
            } else {
              this_.addressList = [];
              this_.addrDivFlag = false;
            }
          }else{
            alert("请重新登录");
            let routeData = this.$router.resolve("/login");
            window.open(routeData.href, '_blank');
          }
        })
      },
      payMoney() {
        if (this.addrDivFlag) {
          var this_ = this;
          this.axios.post(this.Home + '/api/v1/order/add?pids=' + this.pids + '&pamount=' + this.pamount + '&aid=' +
            this.aid).then((res) => {
              console.log(res);
            if (res.data.data) {
              let item = {
                total: this_.total,
                sno: res.data.data
              } 
              sessionStorage.setItem('item', JSON.stringify(item));
              this_.$router.push('/pay');
            
            } else {
              let user = JSON.parse(localStorage.getItem('myUser') || '[]');
              user.upwd = '';
              this_.$router.push('/login');
            }
          })
        } else {
          alert("请添加收货地址");
        }
      },
    },

  }

</script>

<style scoped>
  .book-buy {
    width: 960px;
    margin: 0 auto;
    margin-top: 40px;
  }

  .pinfo {
    color: #333;
    font-weight: bold;
    font-size: 18px;
  }

  .addr-li {
    width: 219px;
    padding: 8px 12px 0 12px;
    height: 115px;
    float: left;
    line-height: 22px;
    background: #FAFAFA;
    margin: 20px 18px 0 0;
    position: relative;
    color: #333;
    font-weight: bold;
    border: 2px solid #e6e4e2;
    cursor: pointer;
  }

  .addr-header {
    width: 210px;
    height: 31px;
    line-height: 31px;
    font-weight: bold;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 4px;
  }

  .tel {
    float: right;
    margin-right: 5px;
  }

  .addr {
    margin-top: 15px;
    height: 30px;
    line-height: 30px;
  }

  .addrClass {
    border: 2px solid #FF4466;
  }

  .address-btn {
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 20px;
    color: #fff;
    font-weight: bold;
    background: #FEBD49;
    border-radius: 3px;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
    font-weight: bold;
  }

  .address-wrapper {
    width: 1000px;
    margin: 30px 0 0 20px;
    background: #FAFAFA;
    border: 1px solid #efefef;
  }

  .address-style {
    width: 980px;
    height: 40px;
    color: #666;
    position: relative;

  }

  .address-name {
    margin-top: 30px;
  }

  .address-style span {
    float: left;
  }

  .name {
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }

  .name-input {
    width: 700px;
    height: 40px;
    margin-left: 10px;
    margin-top: 10px;
  }

  .text {
    height: 26px;
    line-height: 26px;
    color: #666;
	padding-left:6px;
    border: 1px solid #c7c7c7;
    border-radius: 2px;
  }

  .start {
    position: absolute;
    top: 18px;
    left: 100px;
    color: #f00;
    font-size: 20px;
    width: 10px;
    height: 14px;
    line-height: 14px;
  }

  .textarea {
    float: left;
    color: #666;
    margin-left: 10px;
    padding: 6px 8px;
    border: 1px solid #c7c7c7;
    border-radius: 2px;
  }

  .footer-btn {
    width: 980px;
    height: 40px;
    line-height: 40px;
  }

  .btn {
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
  }

  .sure-btn {
    width: 106px;
    background: #FEBD49;
    margin-left: 120px;
  }

  .cancel-btn {
    width: 70px;
    background: #FF6666;
    margin-left: 20px;
  }

  .pro-div {
    margin-top: 40px;
  }

  .pro-wrap {
    width: 770px;
    height: 48px;
    margin-top: 20px;
    background: #f6f6f6;
    border: 1px solid #e5e5e5;
  }

  .pro-wrap ul li {
    float: left;
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .book-info {
    width: 400px !important;
  }

  .pro-list {
    width: 770px;
    height: 120px;
    border: 1px solid #ccc;
    border-top: none;
  }

  .pro-list ul li {
    float: left;
    width: 100px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }


  .book-img img {
    float: left;
    width: 80px;
    height: 80px;
    margin-top: 25px;
    padding: 0 20px;
  }

  .book-desc {
    float: left;
    width: 298px;
    margin-left: -20px;
    margin-top: 20px;
  }

  .book-desc p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 300px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    margin-left: 50px;
  }

  .pro-list p {
    height: 30px;
    line-height: 30px;
  }

  .book-name {
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .pro-list p span {
    color: #666;
  }

  .footer-box {
    width: 770px;
    height: 76px;
    line-height: 76px;
    margin: 20px 0 40px 0;
    text-align: right;
    background: #F1F5F8;
  }

  .footer-num {
    color: #f00;
    font-size: 16px;
  }

  .footer-price {
    color: #f00;
    font-size: 22px;
  }

  .pay-size {
    margin: 0 20px;
    color: #333;
    font-size: 16px;
  }

  .pay-btn {
    width: 100px;
    height: 36px;
    line-height: 36px;
    margin-right: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    background: #ff2832;
    border-radius: 3px;
  }

</style>
