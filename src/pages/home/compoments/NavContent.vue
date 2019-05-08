<template>
  <!-- 导航和轮播图 -->
  <div>
    <div class="book-ad">
      <img src="http://112.74.39.181:1453/img/book-ad.jpg" alt="">
    </div>
    <div class="nav-content">
      <div class="nav-wrap">
        <div class="indexLeftLink">
          <p class="bookCategory">
            <span class="iconfont categoryIcon">&#xe62f;</span>
            <span>图书分类</span>
          </p>
          <ul>
            <li v-for="list in categoryList" :key="list.oid" @click="goCategory(list.ostop)">
              <dl class="primary-dl">
                <dt>
                  <span v-text="list.category"></span><span class="iconfont">&#xe63f;</span>
                </dt>
              </dl>
            </li>
          </ul>
        </div>
        <div class="banner-wraper">
          <swiper :list="imgesList"></swiper>
        </div>
        <div class="banner-right">
          <div class="book-list">
            <p class="book-hot">
              <span>图书热卖榜</span>
              <span class="iconfont hotIcon">&#xe60a;</span>
            </p>
            <ul>
              <li v-for="(list,index) in bookList" :key="list.pid" @click="showBookInfo(list.pid)">
                <dl class="book-dl">
                  <dt>
                    <span :class="index < 3 ? topClass : 'num'" v-text="index+1"></span>
                    <p class="book-name">
                      <a href="">
                        {{list.ptitle}}
                      </a>
                    </p>
                  </dt>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from './Swiper';
  export default {
    created() {
      this.getAll();
      this.getHotList();
    },
    data() {
      return {
        topClass: 'topClass',
        categoryArr:[],
        categoryList: [{
            oid: 1,
            ostop: 562,
          },
          {
            oid: 2,
            ostop: 1202,
          },
          {
            oid: 3,
            ostop: 1842,
          },
          {
            oid: 4,
            ostop: 2482,
          },
          {
            oid: 5,
            ostop: 3122,
          },
          {
            oid: 6,
            ostop: 3762,
          },
          {
            oid: 7,
            ostop: 4402,
          }
        ],
        imgesList: [{
            url: 'http://img52.ddimg.cn/9002790052407902.jpg'
          },
          {
            url: 'http://img61.ddimg.cn/upload_img/00778/a/750x315_fen_wenyi-1545119256.jpg'
          },
          {
            url: 'http://img63.ddimg.cn/topic_img/gys_0015115/2018.12.20BJNZQD750_315.jpg'
          },
          {
            url: 'http://img56.ddimg.cn/9002820076238226.jpg'
          }
        ],
        bookList: [],

      }
    },
    methods: {
      getAll() {
        this.axios.post(this.Home + '/api/v1/category/getAll').then((res) => {
          if (res.data.data.length) {
            this.categoryArr = res.data.data;
            this.setCategoryList();
            
          }
        })
      },
      setCategoryList(){
        for(let i=0;i<7;i++){
          this.categoryList[i].category = this.categoryArr[i].cname;
        }
      },
      goCategory(op) {
        var timer = null;
        timer = setInterval(function () {
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          var ispeed = 100;
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if (osTop + 600 > op) {
            clearInterval(timer);
            document.documentElement.scrollTop = document.body.scrollTop = op - 20;
          }
        }, 10)
      },
      showBookInfo(pid) { //打开另一个窗口，跳转到商品展示页面
        let routeData = this.$router.resolve({
          path: "/detail",
          query: {
            pid: pid
          }
        });
        window.open(routeData.href, '_blank');
      },
      getHotList() {
        this.axios.post('/api/v1/product/search?ptitle=').then((res) => {
          if (res.data.data.list) {
            this.bookList = res.data.data.list.slice(5);
            sessionStorage.setItem('hotList', JSON.stringify(res.data.data.list));
          }
        })
      }
    },
    components: {
      "swiper": Swiper,
    }
  }

</script>

<style scoped>
  .book-ad {
    width: 1200px;
    height: 67px;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .nav-content {
    width: 100%;
    height: 315px;
  }

  .nav-wrap {
    width: 1200px;
    height: 315px;
    margin: 0 auto;
  }

  .indexLeftLink {
    float: left;
    width: 188px;
    height: 313px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: 1px solid #FF4466;
  }

  .bookCategory {
    color: #fff;
    font-size: 18px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #FF4466;
    position: relative;
  }

  .categoryIcon {
    font-size: 18px !important;
    font-weight: bold;
    width: 30px;
    height: 35px;
    line-height: 35px;
    position: absolute;
    left: 25px;
  }

  .indexLeftLink ul li {
    height: 40px;
    width: 195px;
    cursor: pointer;
  }

  .indexLeftLink ul li:hover {
    color: #FF4466;
    transition: .2s all;
  }

  .primary-dl {
    width: 170px;
    text-align: center;
    line-height: 39px;
    margin-left: 12px;
    color: #FF7D7F;
    border-bottom: 1px dotted#FF4466;
  }

  .primary-dl:hover {
    color: #991510;
    border-bottom: 1px solid #FF4466;
    transition: ease .5s;

  }

  .indexLeftLink ul li:last-child dl {
    border: none;
  }

  .iconfont {
    font-size: 12px;
    float: right;
  }

  .banner-wraper {
    float: left;
    width: 750px;
    height: 315px;
    margin-left: 10px;
  }

  .banner-right {
    float: left;
    width: 240px;
    height: 313px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-left: 10px;
  }

  .book-list {
    float: left;
    width: 238px;
    height: 313px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border: 1px solid #487a6f;
  }

  .book-list ul li {
    width: 240px;
    height: 39px;
    line-height: 36px;
  }

  .book-list ul li a:hover {
    color: #487a6f;
    transition: .2s all;
  }

  .book-hot {
    height: 36px;
    line-height: 36px;
    width: 238px;
    font-size: 18px;
    color: #fff;
    text-align: center;
    background: #487a6f;
    position: relative;
  }

  .hotIcon {
    font-size: 18px !important;
    font-weight: bold;
    width: 30px;
    height: 36px;
    line-height: 36px;
    position: absolute;
    right: 45px;
  }

  .book-dl {
    width: 200px;
    height: 39px;
    line-height: 39px;
    margin-left: 12px;
    border-bottom: 1px dotted#487a6f;
  }

  .book-dl:hover {
    border-bottom: 1px solid #487a6f;
    transition: ease .5s;
  }

  .book-list ul li:last-child dl {
    border: none;
  }

  .num {
    float: left;
    margin-left: 10px;
  }

  .topClass {
    float: left;
    margin-left: 10px;
    color: #FF4466;
  }

  .book-name {
    float: left;
    width: 160px;
    padding-left: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }

</style>
