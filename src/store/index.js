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
    ratio: [0],
    prefTwoDay: []

  },
  mutations: {
    ratio(state, data) {//割合
      state.ratio = data
    },
    prefectures(state, data) {
      console.log(data)
      state.coronaData = data
    },
    prefecturesTwoDay(state, data) {
      state.prefTwoDay = data
    },
    prefTotal(state, prefData) {//getters経由
      console.log(prefData)//今日[1]昨日[0]
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
    // coronaTwoDay({ commit }) {
    //   axios.get("https://node-api-corona.herokuapp.com/api/v1/2day/")
    //     .then((res) => {
    //       console.log(res)
    //       commit('prefectures', res.data)
    //     })
    // }
  },
  getters: {
    prefDataFilter: (state) => (id) => {
      return state.coronaData.filter(pref => pref.pref_id == id)
    },
    numComma: () => (num) => {
      return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
  },
  modules: {
  }
})
