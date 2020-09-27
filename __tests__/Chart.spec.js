import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { state } from '@/modules/storeModule.js'
import { getters } from '@/store/index.js'
import LineChartPref from '@/components/LineChartPref.vue'
import LineChartPrefPcr from '@/components/LineChartPrefPcr.vue'
import LineChart from '@/components/LineChart.vue'


const localVue = createLocalVue()
localVue.use(Vuex)

let store
let wrapper
let vm

describe('Chart', () => {

  describe('LineChartPref.vue', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        state,
        getters
      })
      wrapper = shallowMount(LineChartPref, { store, localVue })
      vm = wrapper.vm
    })
    it('method-setPref', () => {
      vm.setPref(true)
      expect(vm.date).toStrictEqual(["09月20日", "09月21日", "09月22日", "09月23日"])
      expect(vm.cases).toStrictEqual([40, 31, 33, 19])
      expect(vm.discharge).toStrictEqual([30, 14, 14, 21])
      expect(vm.hospitalize).toStrictEqual([9, 16, 17, -2])
    })
  })

  describe('LineChartPrefPcr.vue', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        state,
        getters
      })
      wrapper = shallowMount(LineChartPrefPcr, { store, localVue })
      vm = wrapper.vm
    })
    it('method-setPref', () => {
      vm.setPref(true)
      expect(vm.date).toStrictEqual(["09月20日", "09月21日", "09月22日", "09月23日"])
      expect(vm.pcr).toStrictEqual([900, 777, 259, 279])
    })
  })

  describe('LineChart.vue', () => {
    let wrapper
    let vm
    beforeEach(() => {
      store = new Vuex.Store({
        state,
        getters
      })
      wrapper = shallowMount(LineChart, { store, localVue })
      vm = wrapper.vm
    })
    it('method-setRatio', () => {
      vm.setRatio(true)
      expect(vm.cases).toStrictEqual([218, 162, 98])
      expect(vm.discharge).toStrictEqual([170, 94, 68])
      expect(vm.hospitalize).toStrictEqual([48, 68, 29])
      expect(vm.date).toStrictEqual(["09月20日", "09月21日", "09月22日"])


    })
    it('method-dateFormat', () => {
      expect(vm.dateFormat("2020-10-20")).toBe('10月20日')
    })
  })
})
