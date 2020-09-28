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
  it('method-randomColor', () => {//rgbの正規表現、例:rgb(232,121,223)
    expect(vm.randomColor()).toMatch(/^rgb\(((2[0-4]\d|25[0-5]|1\d{1,2}|[1-9]\d|\d)(,?)){2}(2[0-4]\d|25[0-5]|1\d{1,2}|[1-9]\d|\d)\)/)
  })
  it('method-plus データが増えているか', () => {
    vm.datacollection.datasets = []
    expect(vm.datacollection.datasets.length).toBe(0)
    vm.plus([vm.$store.state.ratio[0]], true)
    expect(vm.datacollection.datasets.length).toBe(1)
  })
})