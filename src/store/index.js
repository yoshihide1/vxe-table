import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rankingData: []
  },
  mutations: {
    shopData(state, data) {
      state.rankingData = []
      state.rankingData.push(data)

    }
  },
  actions: {
    rankingData({ commit }){
      const params = {
        applicationId: 
        
      }
      axios.get("https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628",{ params })
      .then((res) => {
        let itemData = res.data.Items
        commit('shopData', itemData)
      })
    }
  },
  modules: {
  }
})
