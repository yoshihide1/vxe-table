import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { initStore } from '../src/modules/storeModule'
import Cumulative from '../src/components/Cumulative.vue'

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
  it('sample', () => {
    console.log(wrapper.vm.pcr)
    // expect(methods.).toBe(408414)
    console.log(store.state.ratio)
  })
})