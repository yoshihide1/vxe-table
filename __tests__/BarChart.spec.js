import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { state } from '@/modules/test-storeModule.js'
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
  it('method-plus データが増えているか', () => {
    vm.datacollection.datasets = []
    expect(vm.datacollection.datasets.length).toBe(0)
    vm.plus([vm.$store.state.ratio[0]], true)
    expect(vm.datacollection.datasets.length).toBe(1)
  })
})