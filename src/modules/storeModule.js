import { actions, mutations, getters } from '../store/index'
import { cloneDeep } from 'lodash'

export const state = {
  allCoronaData: [],
  prefData: [],
  chartPlus: [],
  updateChart: [],
  ratio: [
    {
      "pref_id": "13",
      "prefecture": "東京都",
      "cases": "23828",
      "population": "13942856",
      "deaths": "390",
      "pcr": "408414",
      "hospitalize": "2230",
      "severe": "26",
      "discharge": "21208",
      "created_at": "20200919"
  },
  {
    "pref_id": "13",
    "prefecture": "東京都",
    "cases": "24046",
    "population": "13942856",
    "deaths": "390",
    "pcr": "411359",
    "hospitalize": "2278",
    "severe": "25",
    "discharge": "21378",
    "created_at": "20200920"
},
  ],
  byPrefData: []
}

export const initStore = () => {
  return cloneDeep({
    state,
    mutations,
    actions,
    getters
  })
}