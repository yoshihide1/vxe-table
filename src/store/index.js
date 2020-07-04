import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rankingData: [],
    coronaData: [],
    coronaTotalData: {},
    coronaPrefData: []
  },
  mutations: {
    shopData(state, data) {
      state.rankingData = []
      state.rankingData.push(data)
    },
    prefectures(state, data) {
      state.coronaData = []
      state.coronaData.push(data)
    },
    setTotalData(state, total) {
      state.coronaTotalData = total
    },
    prefInfo(state, data) {
      state.coronaPrefData = data
    }

  },
  actions: {
    rankingData({ commit }) {
      const params = {
        applicationId:
          process.env.VUE_APP_applicationId
      }
      axios.get("https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20170628", { params })
        .then((res) => {
          commit('shopData', res.data.Items)
        })
    },
    //都道府県別
    coronaPrefectures({ commit }) {
      axios.get("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
        .then((res) => {
          commit('prefectures', res.data)
        })
    },
    //都道府県別の詳細
    prefInfomation({ commit }, pref) {
      const params = {
        prefecture: pref
      }
      axios.get("https://covid19-japan-web-api.now.sh/api/v1/positives", {params})
      .then((res) => {
        console.log(res)
        commit('prefInfo', res.data)
      })
    },
    //都道府県取得
    prefectures() {
      axios.get("/prefectures")
      .then((res) => {
        console.log(res)
      })
    }


  },
  modules: {
  }
})
