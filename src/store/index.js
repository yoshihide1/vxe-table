import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rankingData: [],
    coronaData: [],
    coronaDataTotal: {}
  },
  mutations: {
    shopData(state, data) {
      state.rankingData = []
      state.rankingData.push(data)

    },
    setPrefectures(state, data) {
      state.coronaData = []
      state.coronaData.push(data)
    },
    setTotal(state, data) {
      state.coronaDataTotal = data
    }
    
  },
  actions: {
    rankingData({ commit }){
      const params = {
        applicationId: 
        process.env.VUE_APP_applicationId
      }
      axios.get("https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628",{ params })
      .then((res) => {
        commit('shopData', res.data.Items)
      })
    },
    //都道府県別
    coronaPrefectures({ commit }, url) {
      axios.get(url)
      .then((res) => {
        commit('setPrefectures', res.data)
      })
    },
    coronaTotal({ commit }, url) {
      axios.get(url)
      .then((res) => {
        console.log(res)
        commit('setTotal',res.data)
      })
    }
  },
  modules: {
  }
})
