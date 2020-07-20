import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allCoronaData: [],
    prefData: [],
    chartPlus: [],
    updateChart: [],
    ratio: [],

  },
  mutations: {
    ratio(state, data) {//トータル
      state.ratio = data
    },
    allPrefectures(state, data) {
      state.allCoronaData = data
    },
    newPrefTotal(state, newPref) {//getters経由
      console.log(newPref)
      state.prefData = newPref[0]
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
    coronaTotal({ commit }) {
      axios.get("https://node-api-corona.herokuapp.com/api/v1/total/")
        .then((res) => {
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
          let allData = []
          console.log(today)
          for (let x = 0; x < today.length; x++) {
           let todayData = today[x]
            let yesterdayData = yesterday[x]
            allData.push({
              pref_id: todayData['pref_id'],
              prefecture: todayData['prefecture'],
              cases: {today: todayData['cases'], yesterday: yesterdayData['cases']},
              hospitalize: {today: todayData['hospitalize'], yesterday: yesterdayData['hospitalize']},
              discharge: {today: todayData['discharge'], yesterday: yesterdayData['discharge']},
              deaths: {today: todayData['deaths'], yesterday: yesterdayData['deaths']},
              severe: {today: todayData['severe'], yesterday: yesterdayData['severe']},
              pcr: {today: todayData['pcr'], yesterday: yesterdayData['pcr']},
              population: {today: todayData['population'], yesterday: yesterdayData['population']},
              created_at: {today: todayData['created_at'], yesterday: yesterdayData['created_at']}
            })

          }
          console.log(allData)
          commit("allPrefectures", allData)
        })
    }
  },
  getters: {
    newPrefFilter: (state) => (id) => {
      return state.allCoronaData.filter(pref => pref.pref_id == id)
    },
    numComma: () => (num) => {
      return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }
  },
  modules: {
  }
})
