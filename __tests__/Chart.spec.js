import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { state } from '@/modules/storeModule.js'
import LineChartPref from '@/components/LineChartPref.vue'


const localVue = createLocalVue()
localVue.use(Vuex)

let store
let wrapper
let vm

beforeEach(() => {
  store = new Vuex.Store({
    state
  })
  wrapper = shallowMount(LineChartPref, { store, localVue })
  vm = wrapper.vm
})
describe('LineChartPref.vue', () => {


  it('method-setPref-chartData', () => {
    vm.setPref('test')
    expect(vm.date).toStrictEqual(["09月20日", "09月21日", "09月22日", "09月23日"])
    expect(vm.cases).toStrictEqual([40, 31, 33, 19])
    expect(vm.discharge).toStrictEqual([30, 14, 14, 21])
    expect(vm.hospitalize).toStrictEqual([9, 16, 17, -2])
  })
  it('method-dateFormat', () => {
    expect(vm.dateFormat("20200923")).toBe("09月23日")
  })
})
