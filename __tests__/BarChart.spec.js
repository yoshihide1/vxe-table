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
  it('method-totalDataSet', () => {
    const totalData = vm.$store.state.ratio[0]
    expect(vm.totalDataSet(totalData)).toStrictEqual(expect.objectContaining({ "borderWidth": 0, "data": ["24306", "2375", "21540", "27", "391"], "label": "全国(累計)" }))
  })
  it('method-totalPrefDataSet', () => {
    const prefData = vm.$store.state.prefData
    expect(vm.totalPrefDataSet(prefData)).toStrictEqual(expect.objectContaining({ "borderWidth": 0, "data": ["24046", "2278", "21378", "25", "391"], "label": "東京都(累計)" }))
  })
  it('method-plus データが増えているか', () => {
    vm.datacollection.datasets = []
    expect(vm.datacollection.datasets.length).toBe(0)
    vm.plus([vm.$store.state.ratio[0]], true)
    expect(vm.datacollection.datasets.length).toBe(1)
  })
})