<template>
  <div class="order-address">
    <div class="address-right">
      <h1 class="address-title">地址管理</h1>
      <div class="address-edit">
        <button class="address-btn" @click="addAddress">
          <span class="iconfont">&#xe621;</span>
          <span>添加新地址</span>
        </button>
        <div class="address-wrapper" v-if="addressFlag">
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
            <button class="sure-btn btn" @click="sureAddress" v-show="sureFlag">确认地址</button>
            <button class="sure-btn btn" @click="sureEditAddress" v-show="!sureFlag">修改地址</button>
            <button class="cancel-btn btn" @click="cancel">取消</button>
          </p>
        </div>
      </div>
    </div>

    <div class="address-section" v-for="(item,index) in addressList" :key="index" v-if="positionFlag">
      <ul>
        <li v-text="item.name"></li>
        <li class="section-addr" v-text="item.position"></li>
        <li v-text="item.phone"></li>
        <li class="operator">
          <span @click="addressEdit(item.aid,index)">编辑</span>
          <span @click="addressDel(item.aid)">删除</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addressFlag: false, //是否展示地址填写
        name: '',
        address: '',
        tel: '',
        addressList: [],
        positionFlag: false, //判断地址是否要显示
        sureFlag: true, //确认按钮和修改按钮切换
        aid: '',
      }
    },
    created() {
      var user = JSON.parse(localStorage.getItem('myUser') || '[]');
      if (user.upwd) {
        this.getAllAddr();
      } else {
        let routeData = this.$router.resolve("/login");
        window.open(routeData.href, '_blank');
      }
    },
    methods: {
      init() {
        this.name = this.address = this.tel = '';
      },
      checkAddr(){


      },
      addAddress() {
        this.addressFlag = true;
      },
      getAllAddr() {
        this.axios.post(this.Home + '/api/v1/user/getAllAddr').then((res) => {
          if (res.data) {
            if (res.data.data.length) {
              this.addressList = res.data.data;
              this.positionFlag = true;
            } else {
              this.addressList = [];
            }
          }
        })
      },
      sureAddress() {
        let user = JSON.parse(localStorage.getItem('myUser') || '[]');
        let address = this.$qs.stringify({
          uemail: user.uemail,
          name: this.name,
          phone: this.tel,
          position: this.address

        });
        this.axios.post(this.Home + '/api/v1/user/addAddr', address).then((res) => {
          if (res.data.data) {
            this.init();
            this.addressFlag = false;
            this.getAllAddr();
          }
        })
      },
      cancel() {
        this.init();
        this.addressFlag = false;

      },
      addressEdit(aid, index) {
        var addressObject = this.addressList[index];
        this.name = addressObject.name;
        this.tel = addressObject.phone;
        this.address = addressObject.position;
        this.sureFlag = false;
        this.addressFlag = true;
        this.aid = aid;
      },
      sureEditAddress() {
        let user = JSON.parse(localStorage.getItem('myUser') || '[]');
        let address = this.$qs.stringify({
          uemail: user.uemail,
          name: this.name,
          phone: this.tel,
          position: this.address

        });
        this.axios.post(this.Home + '/api/v1/user/addAddr', address).then((res) => {
          if (res.data) {
            this.init();
            this.addressFlag = false;
            this.addressDel(this_.aid);
          }
        })
      },
      addressDel(aid) {
        this.axios.post(this.Home + '/api/v1/user/delAddr?aid=' + aid, ).then((res) => {
          if (res.data) {
            this.getAllAddr();
          }
        })
      }
    },

  }

</script>

<style scoped>
  .order-address {
    float: left;
    width: 1040px;
    margin-left: 20px;
  }

  .address-right {
    width: 100%;
  }

  .address-title {
    font-size: 16px;
    font-weight: 400;
    height: 46px;
    line-height: 46px;
    padding-left: 20px;
    border-bottom: 1px solid #dfdfdf;
  }

  .address-btn {
    width: 115px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 20px 0 0 20px;
    color: #fff;
    background: #FF6666;
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
    padding-left: 6px;
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

  .address-section {
    width: 1000px;
    height: 50px;
    line-height: 50px;
    background: #FAFAFA;
    border: 1px solid #efefef;
    margin: 20px 0 0 20px;
  }

  .address-section ul li {
    float: left;
    width: 200px;
    text-align: center;
    color: #333;
  }

  .section-addr {
    width: 400px !important;
  }

  .operator {
    float: left;
  }

  .operator span {
    width: 65px;
    height: 20px;
    padding: 0 7px;
    color: #2f63cf;
    cursor: pointer;
  }

  .footer {
    height: 50px;
  }

</style>
