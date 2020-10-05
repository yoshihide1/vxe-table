import axios from 'axios'

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