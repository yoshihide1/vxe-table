import Updated from '@/components/Updated.vue'

describe('Updatede', () => {
  it('日付の表示', () => {
    expect(Updated.methods.lastUpdate("2020-10-25")).toBe("最終更新日2020年10月25日")
    expect(Updated.methods.lastUpdate("2020-05-09")).toBe("最終更新日2020年05月09日")
  })
})
