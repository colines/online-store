<template>
  <div>
    <div class="header-wrap">
      <div class="wrap">
        <router-link class="logo" to="/" tag="div"><span class="iconfont iconfont-logo">&#xe60e;</span><span class="store">书
            城</span></router-link>
        <div class="search-nav">
          <div class="search-content">
            <div class="search">
              <span class="iconfont iconfont-search">&#xe678;</span>
              <input type="text" class="search-form" v-model="keyWords" placeholder="关键词" maxlength="50" @keyup.enter="getPage">
              <button type="button" class="btn-search" @click="getPage">搜&nbsp;索</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="content">
        <div class="content-title">
          <div class="category">
            <span>全部商品</script></span>
          </div>
        </div>
        <div class="content-books">
          <ul>
            <li class="book-li" v-for="item in list" :key="item.pid" @click="showBookInfo(item.pid)">
              <img :src="Img + item.headImg" alt="" class="book-img">
              <p class="book-name">{{item.ptitle}}</p>
              <p class="author">作者 {{item.pprovider}} </p>
              <p class="price">
                <span>
                  <span class="price-size">￥</span>
                  <span class="how-price">{{item.pprice/100*0.75}}</span>
                </span>
                <span class="rob">
                  <span class="price-size">￥</span>
                  <span>{{item.pprice/100}}</span>
                </span>
              </p>
            </li>
          </ul>
          <div class="clear-fix"></div>
          <div class="pagation" v-show="pagationFlag">
            <ul>
              <li class="pre" @click="pre">pre</li>
              <li class="pageNum" @click="changePage(page)" :class=" pageIndex == page ? pageClass :'' " v-for="page in pages"
                :key="page">{{page}}</li>
              <li class="next" @click="next">next</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <div class="no-found" v-show="pages < 1">
      <p>抱歉，没有找不到与 "<span>{{words}}</span>" 相关的商品</p>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        pageIndex: 1,
        pageClass: 'pageClass',
        words: '',
        keyWords: '', //关键词
        pageNum: 1, //页码
        pages: 1, //页数
        list: [], //搜索得到的数据
        pagationFlag:false,
      }
    },
    created() {
      this.keyWords = this.$store.state.keyWords;
      this.getPage();
    },
    methods: {
      showBookInfo(pid) { //打开另一个窗口，跳转到商品展示页面
        let routeData = this.$router.resolve({
          path: "/detail",
          query: {
            pid: pid
          }
        });
        window.open(routeData.href, '_blank');
      },
      getPage() {
        let params = this.$qs.stringify({
          ptitle: this.keyWords,
          pageNum: this.pageNum
        })
        this.axios.post(this.Home + '/api/v1/product/search', params).then((res) => {
          if (res.data.data.list.length) {
            this.list = res.data.data.list;
            this.pages = res.data.data.pages;
            this.pagationFlag = true;
          }else{
            this.list = [];
            this.pages = 0;
            this.pagationFlag = false;
            this.words = this.keyWords;
          }
        })
      },
      changePage(page) {
        this.pageIndex = page;
        this.pageNum = page;
        this.getPage();
      },
      pre() {
        if (this.pageNum > 1) {
          this.pageNum--
          this.pageIndex = this.pageNum;
          this.getPage();
        }

      },
      next() {
        if (this.pageNum < this.pages) {
          this.pageNum++
          this.pageIndex = this.pageNum;
          this.getPage();
        }
      }

    },

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

  .main-content {
    width: 100%;
    margin-top: 40px;
  }

  .content {
    width: 1200px;
    margin: 0 auto;
  }

  .content-title {
    width: 1200px;
    height: 30px;
    border-bottom: 3px solid #FF4466;
  }

  .category {
    float: left;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    color: #FF4466;
  }

  .content-books {
    width: 1200px;
    margin-top: 20px;
  }

  .book-li {
    float: left;
    width: 200px;
    height: 300px;
    text-align: center;
  }

  .content-books ul li:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  .book-img {
    min-width: 150px;
    max-width: 150px;
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }

  .book-li p {
    height: 22px;
    line-height: 22px;
  }

  .book-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .book-name:hover {
    text-decoration: underline;
    color: #FF4466;
  }

  .author {
    color: #aaa;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .price {
    color: #c30;
    font-weight: bold;
    font-size: 14px;
  }

  .price-size {
    font-size: 13px;
    margin-right: -5px;
  }

  .rob {
    font-weight: initial;
    margin-left: 12px;
    color: #aaa;
    text-decoration: line-through;
  }

  .pagation {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    margin-top: 40px;
    padding-left: 30%;
  }

  .pagation ul li {
    float: left;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #e7e7e7;
    border-right: none;
    cursor: pointer;
  }

  .next {
    border-right: 1px solid #e7e7e7 !important;
  }

  .pagation ul li:hover {
    background: #FF4466;
    color: #fff;
  }

  .pageClass {
    background: #FF4466;
    color: #fff;
  }

  .no-found {
    width: 1200px;
    height: 30px;
    line-height: 30px;
    margin-top: 100px;
    text-align: center;
    font-size: 18px;
    color: #000;
  }

  .no-found span {
    color: #FF4466;
    font-size: 20px;
    font-weight: bold;
  }

</style>
