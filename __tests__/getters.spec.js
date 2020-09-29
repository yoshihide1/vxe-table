import { getters } from '@/store/index.js'
import testData from '@/assets/testData.json'


describe('getters', () => {
  const state = {
    allCoronaData: []
  }
  it('都道府県別を抽出', () => {
    state.allCoronaData = testData
    const prefFilter = getters.prefDataFilter(state)
    expect(prefFilter(13)).toEqual({
      pref_id: 13,
      prefecture: "東京都",
      cases: "23828",
      created_at: "20200919",
      deaths: "390",
      discharge: "21208",
      hospitalize: "2230",
      pcr: "408414",
      population: "13942856",
      pref_id: "13",
      prefecture: "東京都",
      severe: "26"
    })
  })

  it('カンマのチェック', () => {
    const numComma = getters.numComma()
    expect(numComma(1000000)).toBe('1,000,000')
    expect(numComma(1000)).toBe('1,000')
    expect(numComma(100)).toBe('100')
  })

  it('テーブル部分の退院数、PCR検査数以外の文字色チェック', () => {
    const numColor = getters.numCheck()
    expect(numColor(1)).toMatch('red')
    expect(numColor(-1)).toMatch('blue')
    expect(numColor(0)).toMatch('green')
  })

  it('退院数とPCR検査の文字色チェック', () => {
    const numColor = getters.dischargeAndPcr()
    expect(numColor(0)).toMatch('green')
    expect(numColor(1)).toMatch('blue')
  })

  it('+, ±, の付与チェック', () => {
    const numCheck = getters.comparison()
    const num1 = { item: { today: 1, yesterday: 0 } }
    const num2 = { item: { today: 5, yesterday: 5 } }
    expect(numCheck(num1, 'item')).toBe(`+${num1.item.today - num1.item.yesterday}`)
    expect(numCheck(num2, 'item')).toBe(`±${num2.item.today - num2.item.yesterday}`)
  })

  it('日付の表示', () => {
    const dateFormat = getters.dateFormat()
    expect(dateFormat('20201001')).toBe('10月01日')
  })
})
