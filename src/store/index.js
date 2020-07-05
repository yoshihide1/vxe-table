import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import prefs from '../assets/prefectures.json';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rankingData: [],
    coronaData: [],
    coronaTotalData: {},
    coronaPrefData: [],
    prefInfo: []
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
      console.log(total)
      state.coronaTotalData = total
    },
    prefTotal(state, prefData) {//getters経由
      console.log(prefData)
      state.prefInfo = prefData[0]


    },
    prefInfo(state, data) {
      state.coronaPrefData.push(data)
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
    prefInfomation({ commit }) {
      let total = []
      prefs.forEach((pref) => {
        let params = {
          prefecture: pref.name
        }
        axios.get("https://covid19-japan-web-api.now.sh/api/v1/positives", { params })
          .then((res) => {
            total.push(res)
          })
      })
      commit('prefInfo', total)
      console.log(total)
    },
  },
  getters: {
    prefDataFilter:(state) => (id) => {
      return state.coronaData[0].filter(pref => pref.id == id)
    } 
  },
  modules: {
  }
})
