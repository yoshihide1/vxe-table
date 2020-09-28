import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { state } from '@/modules/storeModule.js'
import BarChart from '@/components/BarChart.vue'


const localVue = createLocalVue()
localVue.use(Vuex)

let store
let wrapper
let vm

describe('BarChart.vue', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      state
    })
    wrapper = shallowMount(BarChart, { store, localVue })
    vm = wrapper.vm
  })
  it('method-randomColor', () => {
    expect(vm.randomColor()).toMatch(/((2[0-4]\d|25[0-5]|1\d{1,2}|[1-9]\d|\d)(,?)){2}(2[0-4]\d|25[0-5]|1\d{1,2}|[1-9]\d|\d)/)
  })
})