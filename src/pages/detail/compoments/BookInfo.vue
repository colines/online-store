<template>
  <div class="book-wrapper">
    <div>
      <img src="http://112.74.39.181:1453/img/book-ad2.jpg" alt="">
    </div>
    <div class="book-show">
      <div class="book-main">
        <div class="big-pic">
          <img class="book-img" :src="src" alt="">
        </div>
        <div class="book-info">
          <div class="info">
            <h1 class="book-name" v-text="bookObject.ptitle"></h1>
            <p class="author-info">
              <span>作者：</span><span class="author" v-text="bookObject.pprovider"></span>
              <span class="publish">出版社：</span><span class="publish-name" v-text="bookObject.pfirm"></span>
            </p>
            <div class="price-info">
              <div class="price-pc">
                <p class="price">
                  <span>价格：</span>
                  <span class="price-origin" v-text="'￥'+bookObject.pprice/100"></span>
                </p>
                <p class="price">
                  <span>促销价：</span>
                  <span class="price-discount">
                    <span class="yuan">￥</span>
                    <span class="discount" v-text="bookObject.pprice/100*0.75"></span>
                  </span>
                </p>
              </div>
            </div>
            <div class="small-pic">
              <p class="pic">照片：</p>
              <ul>
                <li class="small-pic-li" v-for="(src,index) in bookObject.pimgFiles" :key="src" @click="changeBorder(index)"
                  :class="index == bookIndex ? boderClass : ''">
                  <img :src="Img + src" alt="">
                </li>
              </ul>
            </div>
            <div class="book-count">
              <p class="count">数量：</p>
              <div class="num-box">
                <span class="num-reduce iconfont" @click="numReduce" :class="num == 1 ? numClass : ''">&#xe729;</span>
                <input type="text " class="num-input" v-model="num" @blur="checkNum">
                <span class="num-add iconfont" @click="numAdd">&#xe61a;</span>
              </div>
            </div>
            <div class="book-buy">
              <button class="join-cart btn" @click="goCart">
                <span class="iconfont cart-icon">&#xe602;</span>
                <span class>加入购物车</span>
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                  <span class="ball" v-show="ballFlag" ref="ball"></span>
                </transition>
              </button>
              <button class="buy-now btn" @click="goBuy">立即购买</button>
            </div>
          </div>
        </div>
      </div>
      <div class="hot-book">
        <p class="title">
          <s></s>
          <span class="hot-sell">热门推荐</span>
        </p>
        <ul>
          <li class="hot-li" @click="showProduct(hotList[hotIndex].pid)">
            <img :src="Img + hotList[hotIndex].headImg" alt="" class="hot-img">
            <p class="hot-price">￥{{hotList[hotIndex].pprice/100*0.75}}</p>
          </li>
          <li class="hot-li" @click="showProduct(hotList[hotIndex+1].pid)">
            <img :src="Img+ hotList[hotIndex+1].headImg" alt="" class="hot-img">
            <p class="hot-price">￥{{hotList[hotIndex+1].pprice/100*0.75}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="box" v-if="boxFlag">
      <span class="iconfont disappear-icon" @click="boxDisappear">&#xe619;</span>
      <div class="prompt-box">
        <p class="box-p">
          <span class="iconfont success-icon">&#xe620;</span>
          <span class="box-info">已将商品添加到购物车</span>
        </p>
        <router-link tag="button" to="/cart" class="box-pay">去购物车结算<span class="iconfont go-icon">&#xe63f;</span></router-link>
      </div>
    </div>
    <div class="badge" id="badge"></div>
    <div class="clear-fix"></div>
    <guess-content :list="guessList"></guess-content>
    <div class="footer"></div>
  </div>
</template>

<script>
  import GuessContent from './GuessContent'
  export default {
    components: {
      "guess-content": GuessContent,
    },
    created() {
      this.hotUpdate(); //加载热门推荐
      this.getProBypid();
      this.getguessList();
    },
    destroyed() { //销毁定时器
      clearInterval(this.timer);
      this.timer = null; //解绑引用
    },
    data() {
      return {
        num: 1,
        numClass: 'numClass', //数量框样式
        bookIndex: 0, //书的索引
        boderClass: 'boderClass', //点击图片出现边框
        hotIndex: 0, //热门推荐索引
        timer: '', //定时器
        ballFlag: false, //购物车小球
        boxFlag: false, //添加购物车成功后出现提示框,
        product: {}, //商品信息对象
        src: '',
        imgFiles: [],
        bookObject: {},
        hotList: [],
        guessList: [],
      }
    },
    methods: {
      getProBypid() {
        let pid = this.$route.query.pid;
        this.axios.post(this.Home + '/api/v1/product/get?pid=' + pid).then((res) => {
          if (res.data.data) {
            this.bookObject = res.data.data;
            this.src = this.Img + this.bookObject.pimgFiles[0];
          } else {
            this.$router.push('/');
          }
        })
      },
      changeBorder(index) { //图片是否要加边框
        this.bookIndex = index;
        this.src = this.Img + this.bookObject.pimgFiles[index];
      },
      numReduce() { //数量减1
        if (this.num > 1)
          this.num--;
      },
      numAdd() { //商品数量加1
        this.num++;
      },
      checkNum() { //减查数量是否合法
        if (this.num > 1);
        else
          this.num = 1;
      },
      hotUpdate() { //循环播放热门推荐
        this.hotList = JSON.parse(sessionStorage.getItem('hotList') || '[]');
        if (!this.hotList.length) {//当用户强行删掉流浪器缓存时处理方法
          this.axios.post(this.Home + '/api/v1/product/search?ptitle=').then((res) => {
            if (res.data.data.list) {
              this.hotList = res.data.data.list;
              sessionStorage.setItem('hotList', JSON.stringify(res.data.data.list));
            }
          })
        }
        this.timer = null;
        this.timer = setInterval(() => {
          this.hotIndex += 2;
          this.hotIndex = this.hotIndex % (this.hotList.length - 1);
        }, 6000)
      },
      showProduct(pid) { //商品详情展示
        let routeData = this.$router.resolve({
          path: "/detail",
          query: {
            pid: pid
          }
        });
        window.open(routeData.href, '_blank');
      },
      goCart() { //购物车动画
        var user = JSON.parse(localStorage.getItem('myUser') || '[]');
        if (user.upwd) {
          this.bookObject.num = this.num; //更新对象中的数量
          this.ballFlag = true; //小球出现
          var list = JSON.parse(localStorage.getItem('list') || '[]'); //获取购物车
          list.unshift(this.bookObject); //加入购物车
          localStorage.setItem("list", JSON.stringify(list));
          this.$store.commit('setCount', list.length); //更新购物车数量
          var this_ = this;
          setTimeout(() => {
            this_.boxFlag = true;
          }, 1500);
        } else {
          let routeData = this.$router.resolve("/login");
          window.open(routeData.href, '_blank');
        }
      },
      goBuy() {
        var user = JSON.parse(localStorage.getItem('myUser') || '[]');
        if (user.upwd) {
          let itemList = [];
          itemList.unshift(this.bookObject)
          this.bookObject.num = this.num;
          sessionStorage.setItem('itemList', JSON.stringify(itemList));
          this.$router.push('/buy');
        } else {
          let routeData = this.$router.resolve("/login");
          window.open(routeData.href, '_blank');
        }
      },
      boxDisappear() {
        this.boxFlag = false;
      },
      beforeEnter(el) {
        el.style.transform = "translate(0,0)";
      },
      enter(el, done) {
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        const badgePosition = document.getElementById("badge").getBoundingClientRect();
        const x = badgePosition.left - ballPosition.left;
        const y = badgePosition.top - ballPosition.top;
        el.style.transform = `translate(${x}px,${y}px)`;
        el.style.transition = "all 1s cubic-bezier(.6,0,.3,.6)";
        done();

      },
      afterEnter(el) {
        this.ballFlag = false;
      },
      getguessList() {
        var pageNum = 1;
        let params = this.$qs.stringify({
          ptitle: '',
          pageNum: pageNum
        })
        this.axios.post(this.Home + '/api/v1/product/search', params).then((res) => {
          console.log(res);
          console.log("res");
          this.guessList = res.data.data;
        })
      },

    },
  }

</script>

<style scoped>
  .footer {
    height: 40px;
  }

  .book-wrapper {
    width: 1200px;
    margin: 0 auto;
  }

  .book-show {
    width: 1200px;
    margin-top: 20px;
    background: #fdd;
  }

  .pic-info {
    width: 320px;
    overflow: hidden;
  }

  .big-pic {
    float: left;
    width: 350px;
    height: 350px;
    margin-top: 15px;
    text-align: center;
    overflow: hidden;
  }

  .book-img {
    max-width: 320px;
    width: 100%
  }

  .book-info {
    float: left;
    width: 600px;
    height: 400px;
    color: #999;
    margin-left: 20px;
  }

  .book-name {
    font-size: 18px;
    height: 48px;
    line-height: 48px;
    color: #323232;
    margin: 0 auto;
    font-weight: bold;
  }

  .info {
    margin-left: 20px;
  }

  .author-info {
    height: 24px;
    line-height: 24px;
  }

  .author {
    color: #1A66B3;
  }

  .publish {
    margin-left: 10px;
  }

  .publish-name {
    color: #1A66B3;
  }

  .price-info {
    width: 540px;
    height: 66px;
    margin-top: 10px;
    margin-left: -10px;
    background: #f6f6f6;
  }

  .price-pc {
    height: 66px;
    margin: 10px;
  }

  .price-pc p {
    height: 32px;
    line-height: 32px;
  }

  .price-pc p span {
    display: inline;
  }

  .price-origin {
    font-size: 14px;
    text-decoration: line-through;
  }

  .price-discount {
    color: #ef2f23;
  }

  .yuan {
    font-size: 14px;
  }

  .discount {
    font-size: 28px;
    margin-left: -5px;
  }

  .small-pic {
    height: 69px;
    margin-top: 20px;
  }

  .pic {
    float: left;
    width: 54px;
    font-size: 14px;
  }

  .small-pic ul {
    margin: 10px 0 0 5px;
  }

  .small-pic-li {
    float: left;
    width: 55px;
    height: 55px;
    overflow: hidden;
    margin-right: 15px;
    background: #f1f1f1;
    border: 1px solid #ccc;
  }

  .small-pic-li img {
    width: 54px;
    height: 54px;
    border: 1px solid #eee;
  }

  .boderClass {
    border: 1px solid #487a6f;
  }

  .book-count {
    width: 300px;
    height: 42px;
    padding-top: 10px;
  }

  .count {
    float: left;
    width: 54px;
    font-size: 14px;
    margin-top: 3px;
  }

  .book-buy {
    width: 540px;
    height: 75px;
    line-height: 75px;
    padding: 5px 0 20px 54px;
  }

  .btn {
    width: 200px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  .join-cart {
    position: relative;
    background: #f00000;
  }

  .ball {
    position: absolute;
    width: 25px;
    height: 25px;
    left: 80px;
    top: 0px;
    border-radius: 50%;
    background: #f00000;
  }

  .buy-now {
    margin-left: 10px;
    border: 1px solid #ff2832;
    color: #ff2832;
    background-color: #ffedee;
  }

  .cart-icon {
    color: #fff;
    font-size: 20px;
  }

  .hot-book {
    float: left;
    width: 199px;
    height: 400px;
    margin-left: 25px;
    border-left: 1px solid #eee;
  }

  .title {
    float: left;
    color: #666;
    height: 14px;
    line-height: 14px;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    position: relative;
  }

  .title s {
    top: 7px;
    width: 120px;
    height: 0px;
    border-top: 1px solid #eee;
    margin-left: -70px;
    position: absolute;
  }

  .hot-sell {
    color: #999;
    font-size: 16px;
    width: 96px;
    height: 14px;
    text-align: center;
    background: #fff;
    position: absolute;
    left: 42px;
  }

  .hot-book ul li:first-child {
    margin-top: 24px;
  }

  .hot-li {
    width: 100%;
    height: 188px;
    text-align: center;
    cursor: pointer;
  }

  .hot-li:hover {
    opacity: 0.8;
  }

  .hot-img {
    width: 150px;
    height: 150px;
  }

  .hot-price {
    height: 38px;
    line-height: 38px;
    color: #000;
  }

  .hobby {
    width: 100px;
    height: 200px;
  }

  .badge {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    position: fixed;
    right: 10px;
    bottom: 273px;
    background: #fff;
    z-index: -99;
  }


  .box {
    width: 400px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;

  }

  .prompt-box {
    width: 400px;
    height: 200px;
    text-align: center;
    background: #fff;
    border: 1px solid #ccc;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -100px;
    position: relative;
    z-index: 100;
  }

  .box-p {
    height: 40px;
    line-height: 40px;
    margin-top: 50px;
  }

  .disappear-icon {
    position: relative;
    top: 20px;
    left: 380px;
    z-index: 101;
    cursor: pointer;
  }

  .success-icon {
    color: #f00;
    font-weight: 550;
    font-size: 22px;
  }

  .box-info {
    font-size: 18px;
    color: #333;
    width: 200px;
    margin-left: -10px;
    margin-top: -10px;
    display: inline-block;
  }

  .box-pay {
    color: #fff;
    font-size: 20px;
    font-weight: 540;
    cursor: pointer;
    width: 160px;
    height: 40px;
    line-height: 40px;
    background: #F00000;
  }

  .go-icon {
    font-size: 18px;
  }

</style>
