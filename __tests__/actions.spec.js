import {actions} from '../src/store/index.js'

let url = ""
let body = {}
jest.mock("axios", () => ({
  get: (_url, _body) => {
    return new Promise((resolve) => {
      url = _url
      body = _body
      resolve(true)
    })
  }
}))

describe('api test', () => {
  it.skip('byPrefecturesのテスト', async () => {
    const commit = jest.fn()
    console.log("commit:",{commit})
    const req = 13
    console.log(req)
    await actions.byPrefecture({commit}, req)
    expect(url).toEqual(`https://node-api-corona.herokuapp.com/api/v1/pref/`)
    expect(body).toEqual({params:{id: req}})
    expect(commit).toHaveBeenCalledWith("byPref", true)
  })
  it.skip('coronaTwoDayのテスト', async () => {
    const commit = jest.fn()
    await actions.coronaTwoDay({commit})
    expect(url).toEqual('https://node-api-corona.herokuapp.com/api/v1/2day/')
    console.log('twoDay',body)
  })
})
