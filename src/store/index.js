import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './module/mutations.js'
import { actions } from './module/actions.js'
import { getters } from './module/getters.js'

Vue.use(Vuex)

export const state = {
  allCoronaData: [],
  prefData: [],
  chartPlus: [],
  updateChart: [],
  ratio: [],
  byPrefData: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
