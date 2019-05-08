<template>
  <!-- 中间商品内容 -->
  <div class="main-content" >
    <div class="content">
      <div class="content-title">
        <div class="side-icon"></div>
        <div class="category">
          <span v-text="list.category"></span>
        </div>
        <div class="content-more">
          <span class="iconfont">&#xe600;</span>
          <span class="update" @click="update">换一批</span>
        </div>
      </div>
      <div class="content-books">
        <ul>
          <li class="book-li" v-for="book in itemlist.list" :key='book.pid' @click="showBookInfo(book.pid)">
            <img :src="Img + book.headImg" alt="" class="book-img">
            <p class="book-name" v-text="book.ptitle"></p>
            <p class="author">作者 {{book.pprovider}}</p>
            <p class="price">
              <span>
                <span class="price-size">￥</span>
                <span class="how-price" v-text="book.pprice/100*0.75"></span>
              </span>
              <span class="rob">
                <span class="price-size">￥</span>
                <span v-text="book.pprice/100"></span>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["list"],
    created() {
    },
    data() {
      return {
        pageNum: 1,
        pages: '',
        cname: '',
        itemlist:this.list,
      }
    },
    watch: {
      list:function(newVal,oldVal){
        this.itemlist = newVal;
      }
    },
    methods: {
      showBookInfo(pid) { //打开另一个窗口，跳转到商品展示页面
        let routeData = this.$router.resolve({
          path: "/detail",
          query: {
            pid:pid
          }
        });
        window.open(routeData.href, '_blank');
      },
      update() {
        this.pageNum = this.itemlist.pageNum;
        this.pages = this.itemlist.pages;
        this.pageNum = (this.pageNum + 1) % this.pages;
        if (this.pageNum == 0)
          this.pageNum = this.pages;
        let params = this.$qs.stringify({
          cname: this.itemlist.category,
          pageNum: this.pageNum
        })
        this.axios.post(this.Home + '/api/v1/product/getPageByCname', params).then((res) => {
          this.itemlist = res.data.data;
          this.itemlist.category = this.list.category;
        })
      }
    },

  }

</script>

<style scoped>
  .main-content {
    width: 100%;
    height: 600px;
    margin-top: 40px;
  }

  .content {
    width: 1200px;
    margin: 0 auto;
  }

  .content-title {
    width: 1200px;
    height: 30px;
    border-bottom: 1px solid #487a6f;
  }

  .side-icon {
    width: 8px;
    height: 25px;
    float: left;
    margin-right: 15px;
    background: #FF5777;
  }

  .category {
    float: left;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
  }

  .content-more {
    float: right;
    height: 25px;
    line-height: 25px;
    font-size: 16px;
    margin-right: 5px;
  }

  .iconfont {
    font-size: 16px;
    font-weight: bold;
    color: #25a4bb;
  }

  .update {
    color: #25a4bb;
    font-size: 16px;
  }

  .content-more .update:hover {
    color: #FF5777;
    cursor: pointer;
  }

  .content-books {
    width: 1200px;
    margin-top: 20px;
    height: 560px;
  }

  .book-li {
    float: left;
    width: 198px;
    height: 272px;
    border: 1px solid #fff;
    text-align: center;
  }

  .content-books ul li:hover {
    border: 1px solid #487a6f;
    transition: ease .5s;
    cursor: pointer;
    transform: scale(1.05);
  }

  .book-img {
    min-width: 150px;
    min-height: 150px;
    max-width: 150px;
    width: 100%;
    text-align: center;
    margin-top: 20px;
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

</style>
