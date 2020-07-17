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
    updateChart: [],
    ratio: [0]
  },
  mutations: {
    ratio(state, data) {//割合
      state.ratio = data
    },
    prefectures(state, data) {
      state.coronaData = data
    },
    prefTotal(state, prefData) {//getters経由
      state.coronaPrefData = prefData[0]
    },
    chart(state, prefData) {
      state.chartPlus = []
      state.chartPlus.push(prefData)
    },
    deleteChart(state, prefData) {
      state.updateChart = prefData
    }
  },
  actions: {
    coronaToday({ commit }) {
      axios.get("https://node-api-corona.herokuapp.com/api/v1/today/")
        .then((res) => {
          console.log(res)
          commit('prefectures', res.data)
        })
    },
    coronaTotal({ commit }) {
      axios.get("https://node-api-corona.herokuapp.com/api/v1/total/")
        .then((res) => {
          console.log(res)
          commit('ratio', res.data)
        })
    },
  },
  getters: {
    prefDataFilter: (state) => (id) => {
      return state.coronaData.filter(pref => pref.pref_id == id)
    },
    // numComma: (num) => {
    //   return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    // }
  },
  modules: {
  }
})
