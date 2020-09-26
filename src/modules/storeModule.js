import { actions, mutations, getters } from '../store/index'
import { cloneDeep } from 'lodash'

export const state = {
  allCoronaData: [
    {
      pref_id: "1",
      prefecture: "北海道",
      cases: { today: "1996", yesterday: "1984" },
      population: { today: "5248552", yesterday: "5248552" },
      deaths: { today: "107", yesterday: "107" },
      pcr: { today: "54197", yesterday: "53764" },
      hospitalize: { today: "105", yesterday: "109" },
      severe: { today: "1", yesterday: "1" },
      discharge: { today: "1784", yesterday: "1768" },
      created_at: { today: "20200925", yesterday: "20200924" }
    },
    {
      pref_id: "13",
      prefecture: "東京都",
      cases: { today: "24046", yesterday: "23828" },
      population: { today: "13942856", yesterday: "13942856" },
      deaths: { today: "391", yesterday: "390" },
      pcr: { today: "411359", yesterday: "408414" },
      hospitalize: { today: "2278", yesterday: "2230" },
      severe: { today: "25", yesterday: "26" },
      discharge: { today: "21378", yesterday: "21208" },
      created_at: { today: "20200920", yesterday: "20200919" },
    }
  ],
  prefData: {
    pref_id: "13",
    prefecture: "東京都",
    cases: { today: "24046", yesterday: "23828" },
    population: { today: "13942856", yesterday: "13942856" },
    deaths: { today: "391", yesterday: "390" },
    pcr: { today: "411359", yesterday: "408414" },
    hospitalize: { today: "2278", yesterday: "2230" },
    severe: { today: "25", yesterday: "26" },
    discharge: { today: "21378", yesterday: "21208" },
    created_at: { today: "20200920", yesterday: "20200919" },
  },
  chartPlus: [],
  updateChart: [],
  ratio: [
    {
      pref_id: "13",
      prefecture: "東京都",
      cases: "23828",
      population: "13942856",
      deaths: "390",
      pcr: "408414",
      hospitalize: "2230",
      severe: "26",
      discharge: "21208",
      created_at: "20200919"
    },
    {
      pref_id: "13",
      prefecture: "東京都",
      cases: "24046",
      population: "13942856",
      deaths: "391",
      pcr: "411359",
      hospitalize: "2278",
      severe: "25",
      discharge: "21378",
      created_at: "20200920"
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