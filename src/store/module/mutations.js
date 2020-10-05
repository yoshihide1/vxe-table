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