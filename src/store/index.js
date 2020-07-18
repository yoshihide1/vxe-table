import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newCoronaData: [],
    oldCoronaData: [],
    coronaPrefData: [],
    chartPlus: [],
    updateChart: [],
    ratio: [0],

  },
  mutations: {
    ratio(state, data) {//トータル
      state.ratio = data
    },
    newPrefectures(state, data) {
      console.log(data)
      state.newCoronaData = data
    },
    oldPrefectures(state, data) {
      console.log(data)
      state.oldCoronaData = data
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
    // coronaToday({ commit }) {
    //   axios.get("https://node-api-corona.herokuapp.com/api/v1/today/")
    //     .then((res) => {
    //       console.log(res)
    //       commit('prefectures', res.data)
    //     })
    // },
    coronaTotal({ commit }) {
      axios.get("https://node-api-corona.herokuapp.com/api/v1/total/")
        .then((res) => {
          console.log(res)
          commit('ratio', res.data)


        })
    },
    coronaTwoDay({ commit }) {
      axios.get("https://node-api-corona.herokuapp.com/api/v1/2day/")
        .then((res) => {
          let today = []
          let yesterday = []
          let data = res.data
          for (let i = 0; i < 47; i++) {
            yesterday.push(data[i])
          }
          for (let j = 47; j < 94; j++) {
            today.push(data[j])
          }
          commit("newPrefectures", today)
          commit("oldPrefectures", yesterday)
        })
    }
  },
  getters: {
    prefDataFilter: (state) => (id) => {
      return state.newCoronaData.filter(pref => pref.pref_id == id)
    },
    numComma: () => (num) => {
      return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
  },
  modules: {
  }
})
