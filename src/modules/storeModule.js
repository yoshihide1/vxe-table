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
      "pref_id": "13",
      "population": "13942856",
      "cases": "24306",
      "deaths": "391",
      "pcr": "412653",
      "hospitalize": "2375",
      "severe": "27",
      "discharge": "21540",
      "created_at": "20200922",
      "prefecture": "東京都"
    },
    {
      "pref_id": "13",
      "population": "13942856",
      "cases": "24208",
      "deaths": "390",
      "pcr": "411359",
      "hospitalize": "2346",
      "severe": "27",
      "discharge": "21472",
      "created_at": "20200921",
      "prefecture": "東京都"
    },
    {
      "pref_id": "13",
      "population": "13942856",
      "cases": "24046",
      "deaths": "391",
      "pcr": "411359",
      "hospitalize": "2278",
      "severe": "25",
      "discharge": "21378",
      "created_at": "20200920",
      "prefecture": "東京都"
    },
    {
      "pref_id": "13",
      "population": "13942856",
      "cases": "23828",
      "deaths": "390",
      "pcr": "408414",
      "hospitalize": "2230",
      "severe": "26",
      "discharge": "21208",
      "created_at": "20200919",
      "prefecture": "東京都"
    },

  ],
  byPrefData: [
    {
      "pref_id": "23",
      "cases": "4999",
      "pcr": "67306",
      "hospitalize": "368",
      "discharge": "4554",
      "created_at": "20200919",
      "prefecture": "愛知県"
    },
    {
      "pref_id": "23",
      "cases": "5039",
      "pcr": "68206",
      "hospitalize": "377",
      "discharge": "4584",
      "created_at": "20200920",
      "prefecture": "愛知県"
    },
    {
      "pref_id": "23",
      "cases": "5070",
      "pcr": "68983",
      "hospitalize": "393",
      "discharge": "4598",
      "created_at": "20200921",
      "prefecture": "愛知県"
    },
    {
      "pref_id": "23",
      "cases": "5103",
      "pcr": "69242",
      "hospitalize": "410",
      "discharge": "4612",
      "created_at": "20200922",
      "prefecture": "愛知県"
    },
    {
      "pref_id": "23",
      "cases": "5122",
      "pcr": "69521",
      "hospitalize": "408",
      "discharge": "4633",
      "created_at": "20200923",
      "prefecture": "愛知県"
    },

  ]
}

export const initStore = () => {
  return cloneDeep({
    state,
    mutations,
    actions,
    getters
  })
}