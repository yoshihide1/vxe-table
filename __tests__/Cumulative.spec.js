import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { initStore } from '../src/modules/storeModule'
import Cumulative from '../src/components/Cumulative.vue'
import axios from 'axios'

let store
let localVue
let wrapper

beforeEach(() => {
  localVue = createLocalVue()
  localVue.use(Vuex)
  store = new Vuex.Store(initStore())
  wrapper = shallowMount(Cumulative, {store, localVue})
})

describe('Cumulative.vue', () => {
  const methods = Cumulative.methods
  it('sample', async() => {
    await wrapper.setData({pcr: 100})
    // console.log(wrapper.vm.count)
    // console.log(wrapper.vm.pcr)
    // expect(methods.).toBe(408414)
    // console.log(store.state.ratio)
  })
})

import Cumulative from '../src/components/Cumilative'
import {mount} from '@vue/test-utils'
describe('Cumulative.vue', () => {
  it('表示の確認', () => {
   const wrapper = mount(Cumulative)
   const result = wrapper.vm.methods.cumulative({ratio: {
      pcr: 111,
      cases: 222,
      deaths:333
    }})
    console.log(result)
  })
})