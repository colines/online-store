<template>
  <div class='home-header'>
    <header-top></header-top>
    <header-wrap></header-wrap>
    <nav-content></nav-content>
    <teach-content :list="list1"></teach-content>
    <liter-content :list="list2"></liter-content>
    <novel-content :list="list3"></novel-content>
    <life-content     :list="list4"></life-content>
    <techno-content   :list="list5"></techno-content>
    <magazine-content :list="list6"></magazine-content>
    <cartoon-content  :list="list7"></cartoon-content>
    <right-nav></right-nav>
    <div class="footer"></div>
  </div>
</template>

<script>
  import HeaderTop from '../common/compoments/HeaderTop';
  import HeaderWrap from '../common/compoments/HeaderWrap';
  import NavContent from './compoments/NavContent';
  import MainContent from '../common/compoments/MainContent';
  import RightNav from '../common/compoments/RightNav'
  export default {
    components: {
      "header-top": HeaderTop,
      "header-wrap": HeaderWrap,
      "nav-content": NavContent,
      "teach-content": MainContent,
      "liter-content": MainContent,
      "novel-content": MainContent,
      "life-content": MainContent,
      "techno-content": MainContent,
      "magazine-content": MainContent,
      "cartoon-content": MainContent,
      "right-nav": RightNav,
    },
    created() {
      this.getAll();
    },
    data() {
      return {
        categoryArr: [],
        allList:[],
        list1:[],
        list2:[],
        list3:[],
        list4:[],
        list5:[],
        list6:[],
        list7:[],
      }
    },
    methods: {
      getAll() {
        this.axios.post(this.Home + '/api/v1/category/getAll').then((res) => {
          if (res.data.data.length) {
            this.categoryArr = res.data.data;
            this.getAllList();
          }
        })
      },
      getAllList() {
        for(let i=0;i<7;i++){
          this.getList(this.categoryArr[i].cname);
        }
      },
      getList(cname){
        let params = this.$qs.stringify({
          cname: cname,
          pageNum: 1
        })
       this.axios.post(this.Home + '/api/v1/product/getPageByCname', params).then((res) => {
          res.data.data.category = cname;
          switch(cname){
            case '动漫':this.list1 = res.data.data;break;
            case '哲学':this.list2 = res.data.data;break;
            case '小说':this.list3 = res.data.data;break;
            case '教育':this.list4 = res.data.data;break;
            case '文学':this.list5 = res.data.data;break;
            case '生活':this.list6 = res.data.data;break;
            case '科技':this.list7 = res.data.data;break;
          }
        })
      },
    },

  }

</script>

<style scoped>
  .home-header {
    height: 30px;
    background: #fff;
    border-bottom: 1px solid #F0F0F0;
  }

  .footer {
    height: 100px;
  }

</style>
