import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { state } from '@/modules/test-storeModule.js'
import { getters } from '@/store/module/getters.js'
import LineChartPref from '@/components/Chart/LineChartPref.vue'
import LineChartPrefPcr from '@/components/Chart/LineChartPrefPcr.vue'
import LineChart from '@/components/Chart/LineChart.vue'
import LineChartPcr from '@/components/Chart/LineChartPcr.vue'


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
      expect(vm.date).toStrictEqual(["9月20日", "9月21日", "9月22日", "9月23日"])
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
      expect(vm.date).toStrictEqual(["9月20日", "9月21日", "9月22日", "9月23日"])
      expect(vm.pcr).toStrictEqual([900, 777, 259, 279])
    })
  })

  describe('LineChart.vue', () => {
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
      expect(vm.date).toStrictEqual(["9月20日", "9月21日", "9月22日"])
      expect(vm.cases).toStrictEqual([218, 162, 98])
      expect(vm.discharge).toStrictEqual([170, 94, 68])
      expect(vm.hospitalize).toStrictEqual([48, 68, 29])
    })
  })

  describe('LineChartPcr.vue', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        state,
        getters
      })
      wrapper = shallowMount(LineChartPcr, { store, localVue })
      vm = wrapper.vm
    })
    it('method-setRatio', () => {
      vm.setRatio(true)
      expect(vm.date).toStrictEqual(["9月20日", "9月21日", "9月22日"])
      expect(vm.pcr).toStrictEqual([2945, 0, 1294])
      expect(vm.cases).toStrictEqual([218, 162, 98])
    })
  })
})
