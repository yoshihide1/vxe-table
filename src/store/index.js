import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coronaData: [],
    coronaTotalData: [],
    coronaPrefData: [],
    chartPlus: [],
    updateChart: []
  },
  mutations: {
    prefectures(state, data) {
      state.coronaData = data
      console.log(state.coronaData)
    },
    setTotalData(state, total) {
      console.log(total)
      state.coronaTotalData = total
    },
    prefTotal(state, prefData) {//getters経由
      console.log(prefData)
      state.coronaPrefData = prefData[0]
    },
    chart(state, prefData) {
      console.log(prefData)
      state.chartPlus = []
      state.chartPlus.push(prefData)
    },
    deleteChart(state, prefData) {
      console.log(prefData)
      state.updateChart = prefData
    }
  },
  actions: {
    //都道府県別
    coronaPrefectures({ commit }) {
      axios.get("https://covid19-japan-web-api.now.sh/api/v1/prefectures")
        .then((res) => {
          commit('prefectures', res.data)
        })
    },
    //都道府県別の詳細
    // prefInfomation({ commit }) {
    //   let total = []
    //   prefs.forEach((pref) => {
    //     let params = {
    //       prefecture: pref.name
    //     }
    //     axios.get("https://covid19-japan-web-api.now.sh/api/v1/positives", { params })
    //       .then((res) => {
    //         total.push(res)
    //       })
    //   })
    //   commit('prefInfo', total)
    //   console.log(total)
    // },
  },
  getters: {
    prefDataFilter: (state) => (id) => {
      return state.coronaData.filter(pref => pref.id == id)
    },
  },
  modules: {
  }
})
