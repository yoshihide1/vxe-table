import {mount} from '@vue/test-utils'
import {Corona} from '@/views/corona.vue'

describe('Test Corona', () => {
  it('初期描画？', () => {
    const wrapper = mount(Corona)
    expect(wrapper.created).toBeTruthy()
  })
})