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
    byPrefData: []

  },
  mutations: {
    ratio(state, data) {//トータル
      state.ratio = data
    },
    allPrefectures(state, data) {
      state.allCoronaData = data
    },
    newPrefTotal(state, newPref) {//getters経由
      state.prefData = newPref
    },
    chart(state, prefData) {
      state.chartPlus = []
      state.chartPlus.push(prefData)
    },
    deleteChart(state, prefData) {
      state.updateChart = prefData
    },
    byPref(state, prefData) {
      state.byPrefData = prefData
    }
  },
  actions: {
    async byPrefecture({ commit }, req) {
      const params = {
        id: req
      }
      let res = await axios.get("https://node-api-corona.herokuapp.com/api/v1/pref/", { params })
      commit('byPref', res.data)
    },

    async coronaTotal({ dispatch, commit }) {
      let res = await axios.get("https://node-api-corona.herokuapp.com/api/v1/total/")
      commit('ratio', res.data)
      dispatch('coronaTwoDay')
    },

    async coronaTwoDay({ commit }) {
      let res = await axios.get("https://node-api-corona.herokuapp.com/api/v1/2day/")
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
      for (let x = 0; x < today.length; x++) {
        let todayData = today[x]
        let yesterdayData = yesterday[x]
        allData.push({
          pref_id: todayData['pref_id'],
          prefecture: todayData['prefecture'],
          cases: { today: todayData['cases'], yesterday: yesterdayData['cases'] },
          hospitalize: { today: todayData['hospitalize'], yesterday: yesterdayData['hospitalize'] },
          discharge: { today: todayData['discharge'], yesterday: yesterdayData['discharge'] },
          deaths: { today: todayData['deaths'], yesterday: yesterdayData['deaths'] },
          severe: { today: todayData['severe'], yesterday: yesterdayData['severe'] },
          pcr: { today: todayData['pcr'], yesterday: yesterdayData['pcr'] },
          population: { today: todayData['population'], yesterday: yesterdayData['population'] },
          created_at: { today: todayData['created_at'], yesterday: yesterdayData['created_at'] }
        })
      }
      commit("allPrefectures", allData)
    }
  },
  getters: {
    prefDataFilter: (state) => (id) => {
      return state.allCoronaData.find(pref => pref.pref_id == id)
    },

    numComma: () => (num) => {
      return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    },

    numCheck: () => (num) => {
      if (num > 0) return "red";
      if (num < 0) return "blue";
      return "green"
    },

    comparison: () => (data, value) => {
      let name = value;
      let today = data[name].today
      let yesterday = data[name].yesterday
      let num = today - yesterday
      if (num === 0) return `±${num}`
      if (num > 0) return `+${num}`
      return num
    }
  },
})
