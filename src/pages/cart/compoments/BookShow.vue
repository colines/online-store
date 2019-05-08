<template>
  <div class="cart-show">
    <div class="cart-body" v-if="cartFlag">
      <div class="cart-all">
        全部商品<span class="num">{{count}}</span>
      </div>
      <div class="cart-wrap">
        <ul>
          <li class="all-check">
            <input type="checkbox" name="" id="a-c" v-model="checkedAll" @click="checkAll()">
            <label for="a-c">全选</label>
          </li>
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
            <span>小计</span>
          </li>
          <li>
            <span>操作</span>
          </li>
        </ul>
      </div>
      <div class="cart-list" v-for="(item,index) in cartList" :key="item.pid" :class="checkeds[index] == true ? bgClass :''">
        <ul>
          <li>
            <input type="checkbox" name="checkboxs" class="checkbox" :id="'check'+index" v-model="checkeds[index]"
              @click="clearAllChecked(index)">
          </li>
          <li class="book-info">
            <div class="book-img">
              <img :src="Img+item.headImg" alt="">
            </div>
            <div class="book-desc">
              <p class="book-name" v-text="item.ptitle" @click="showBook(item.pid)"></p>
              <p>
                <span>作者：</span><span class="author" v-text="item.pprovider"></span>
              </p>
              <p>
                <span>出版社：</span><span v-text="item.pfirm"></span>
              </p>
            </div>
          </li>
          <li>
            <span class="price" v-text="'￥'+item.pprice/100*0.75"></span>
          </li>
          <li>
            <div class="num-box cart-box">
              <span class="num-reduce iconfont" @click="numReduce(index)" :class="item.num == 1 ? numClass : ''">&#xe729;</span>
              <input type="text " class="num-input" v-model.number="item.num" @blur="checkNum(index)">
              <span class="num-add iconfont" @click="numAdd(index)">&#xe61a;</span>
            </div>
          </li>
          <li>
            <span class="sum" v-text="'￥'+item.num * item.pprice/100*0.75"></span>
          </li>
          <li>
            <span class="del" @click="del(index)">删除</span>
          </li>
        </ul>
      </div>
      <div class="footer-top"></div>
      <div class="cart-footer">
        <div class="footer-left">
          <span class="footer-all-checked footer-nav">
            <input type="checkbox" @click="checkAll" v-model="checkedAll"> 全选
          </span>
          <span class="footer-nav" @click="selectedDel">
            批量删除
          </span>
          <span class="choice footer-nav">
            已选择<b class="pro-num" v-text="selectCount"></b>件商品
          </span>
        </div>
        <div class="footer-right">
          <span class="pro-pay" :class="selectCount > 0 ? payClass : ''" @click="payMoney">结算</span>
          <span class="pro-sum">
            总计：<span class="all-sum" v-text="'￥'+sum"></span>
          </span>
        </div>
      </div>
    </div>
    <div class="cart-null" v-if="!cartFlag">
      <span class="iconfont cart-icon">&#xe602;</span>
      <span class="cart-info">您的购物车还是空的，赶快去挑选商品吧！</span>
      <span class="reminder">
        去<router-link to="/">商城</router-link>首页逛逛吧
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      var user = JSON.parse(localStorage.getItem('myUser') || '[]');
      if (user.upwd) {
        var list = JSON.parse(localStorage.getItem('list') || '[]'); //获取购物车
        if (list.length) {
          this.checkeds = new Array(list.length);
          this.checkeds.fill(false); //将选择按钮全部默认为不选中
          this.count = list.length; //初始化全部商品的数量
          this.cartFlag = true;
          this.cartList = list;
        } else {
          this.cartFlag = false;
        }
      } else {
        this.$router.push('/login');
      }
    },
    data() {
      return {
        checkedAll: false, //全选按钮
        count: 0, //全部商品的数量
        checkeds: [], //选择按钮的数组
        haveChecked: '',
        numClass: 'numClass',
        bgClass: 'bgClass',
        payClass: 'payClass',
        cartFlag: false, //标志：购物车是否为空
        cartList: [],
      }
    },
    computed: {
      sum() { //计算总价
        let sum = 0;
        for (let i in this.cartList) {
          if (this.checkeds[i])
            sum += this.cartList[i].num * this.cartList[i].pprice / 100 * 0.75;
        }
        return sum;

      },
      selectCount() { //已选的数量
        if (this.count == 0)
          return 0;
        let count = 0;
        for (let i = 0; i < this.checkeds.length; i++) {
          if (this.checkeds[i])
            count++;
        }
        return count;
      }
    },
    methods: {
      numReduce(index) { //数量减1
        if (this.cartList[index].num > 1)
          this.cartList[index].num--;

      },
      numAdd(index) { //数量加1
        this.cartList[index].num++;

      },
      checkNum(index) { //检查输入数量是否合理
        if (this.cartList[index].num > 1);
        else
          this.cartList[index].num = 1;
      },
      checkAll() { //全选按钮
        if (!this.checkedAll) {
          for (let i = 0; i < this.checkeds.length; i++) {
            this.$set(this.checkeds, i, true);
          }
        } else {
          for (let i = 0; i < this.checkeds.length; i++) {
            this.$set(this.checkeds, i, false);
          }
        }
      },
      clearAllChecked(index) { //检查是否要清除全选按钮
        if (this.checkeds[index])
          this.checkedAll = false;
      },
      del(index) { //删除单个订单
        this.count--; //商品数减减
        this.checkeds.length--; //单选框数组减减
        this.$store.commit('setCount', this.count); //更新购物车数量
        if (this.cartList.length > 1)
          this.checkeds[index] = this.checkeds[index + 1];
        var list = JSON.parse(localStorage.getItem('list') || '[]');
        list.splice(index, 1);
        localStorage.setItem('list', JSON.stringify(list));
        this.cartList = list;
        if (this.count == 0)
          this.cartFlag = false
        else
          this.cartFlag = true;
      },
      selectedDel() { //批量删除
        let indexArr = []; //记录要删除的索引
        let k = 0;
        for (let i = 0; i < this.checkeds.length; i++) {
          if (this.checkeds[i])
            indexArr[k++] = i;
        }
        for (let i = k - 1; i >= 0; i--)
          this.del(indexArr[i]); //删除索引对应的订单
        if (!this.count) //检查全选按钮设置为未选中
          this.checkedAll = false;
      },
      showBook(pid) {
        //商品详情页面
        this.$router.push({
          path: '/detail',
          query: {
            pid: pid
          }
        });
      },
      payMoney() {
        var user = JSON.parse(localStorage.getItem('myUser') || '[]');
        if (user.upwd) {
          let itemList = [];
          let list = [];
          for (let i in this.cartList) {
            if (this.checkeds[i]) { //商品选择就加入itemList
              itemList.push(this.cartList[i]);
            }else{
              list.push(this.cartList[i]);
            }
          }
		  if(itemList.length){
			  sessionStorage.setItem('itemList', JSON.stringify(itemList));
			  localStorage.setItem("list", JSON.stringify(list));
			  this.$store.commit("setCount", list.length);
			  this.$router.push('/buy');
		  }
        } else {
          this.$router.push('/login');
        }
      },

    },

  }

</script>

<style scoped>
  .cart-body {
    width: 1200px;
    height: 300px;
    margin: 0 auto;
    margin-top: 40px;
  }

  .cart-all {
    width: 150px;
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    color: #f57;
    margin-bottom: 5px;
  }

  .num {
    margin-left: 8px;
  }

  .cart-wrap {
    width: 1200px;
    height: 48px;
    background: #f6f6f6;
    border: 1px solid #e5e5e5;
  }

  .cart-wrap ul li {
    float: left;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .checkbox {
    cursor: pointer;
  }

  .book-info {
    width: 450px !important;
  }

  .cart-list {
    width: 1200px;
    height: 120px;
    margin-top: 20px;
    border: 1px solid #ccc;
  }

  .cart-list ul li {
    float: left;
    width: 150px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }


  .book-img img {
    float: left;
    width: 80px;
    height: 80px;
    margin-top: 25px;
    border: 1px solid #ccc;
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

  .price {
    color: #999;
  }

  .cart-list p {
    height: 30px;
    line-height: 30px;
  }

  .book-name {
    font-weight: bold;
    cursor: pointer;
  }

  .book-name:hover {
    text-decoration: underline;
    color: #FF4567;
  }

  .cart-list p span {
    color: #666;
  }

  .cart-box {
    margin: 45px 0 0 25px;
  }

  .sum {
    color: #f00;
  }

  .del {
    color: #25a4bb;
    cursor: pointer;
  }

  .bgClass {
    background: #FFF6F6;
  }

  .footer-top {
    height: 90px;
  }

  .cart-footer {
    width: 1200px;
    height: 58px;
    position: fixed;
    bottom: 0px;
    z-index: 99;
    background: #F9F9F9;
    border: 1px solid #e5e5e5;
  }

  .footer-left {
    float: left;
    width: 600px;
    height: 58px;
    line-height: 58px;
  }

  .footer-right {
    float: right;
    width: 600px;
    height: 58px;
    line-height: 58px;
  }

  .footer-all-checked {
    text-align: center;
  }

  .footer-nav {
    float: left;
    display: block;
    width: 150px;
    height: 58px;
    cursor: pointer;
  }

  .pro-num {
    color: rgb(224, 13, 13);
    margin: 0 5px;
  }

  .pro-sum {
    float: right;
    display: block;
    width: 450px;
    height: 58px;
    line-height: 58px;
    text-align: center;
  }

  .pro-pay {
    float: right;
    font-size: 20px;
    width: 150px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    color: #fff;
    background: #E0E0E0;
    cursor: pointer;
  }

  .all-sum {
    font-size: 28px;
    font-weight: 700;
    color: #ff5777;
  }

  .payClass {
    background: #f13e3a;
  }

  .cart-null {
    width: 800px;
    height: 150px;
    margin-left: 450px;
    margin-top: 100px;
  }

  .cart-icon {
    float: left;
    font-size: 100px;
    color: #FF4567;
  }

  .cart-info {
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
