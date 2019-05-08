import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
    orderFlag:true,//订单是否为空
    keyWords:'',
    itemList:[],
    pageNum:1,
    pages:'',
    hotList:[],
  },
  mutations: {
    getCount(state) {
      return state.count;
    },
    setCount(state, count) {
      state.count = count;
    },
    setOrderFlag(state,boolean){
      state.orderFlag = boolean;
    },
    setKeyWords(state,keyWords){
      state.keyWords = keyWords;
    },
    setItemlist(state,itemList){
      state.itemList = itemList;
    },
    setHotList(state,list){
      state.hotList = list;
    }
  }
})
export default store
