import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export const state = {
  allCoronaData: [],
  prefData: [],
  chartPlus: [],
  updateChart: [],
  ratio: [],
  byPrefData: []
}

export const mutations = {
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
}

export const actions = {
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
      let t = today[x]
      let y = yesterday[x]
      allData.push({
        pref_id: t['pref_id'],
        prefecture: t['prefecture'],
        cases: { today: t['cases'], yesterday: y['cases'] },
        hospitalize: { today: t['hospitalize'], yesterday: y['hospitalize'] },
        discharge: { today: t['discharge'], yesterday: y['discharge'] },
        deaths: { today: t['deaths'], yesterday: y['deaths'] },
        severe: { today: t['severe'], yesterday: y['severe'] },
        pcr: { today: t['pcr'], yesterday: y['pcr'] },
        population: { today: t['population'], yesterday: y['population'] },
        created_at: { today: t['created_at'], yesterday: y['created_at'] }
      })
    }
    commit("allPrefectures", allData)
  }
}

export const getters = {
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

  dischargeAndPcr: () => (num) => {
    if (num > 0) return "blue"
    return "green"
  },

  comparison: () => (data, item) => {
    const num = data[item].today - data[item].yesterday
    if (num === 0) return `±${num}`
    if (num > 0) return `+${num}`
    return num
  },

  dateFormat: () => (date) => {
    const a = date.slice(4, 6)
    const b = date.slice(6, 9)
    return `${Number(a)}月${b}日`;
  },
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
