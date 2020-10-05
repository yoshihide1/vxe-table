import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { getters } from '@/store/module/getters.js'
import { state } from '@/modules/test-storeModule.js'
import DomesticPrefecture from '@/components/DomesticPrefecture.vue'
import CoreuiVue from '@coreui/vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(CoreuiVue);

describe('DomesticPrefecture.vue', () => {
  let store
  let wrapper
  let vm

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters
    })
    wrapper = shallowMount(DomesticPrefecture, { store, localVue })
    vm = wrapper.vm
  })
  it('method-prefFilter', () => {
    vm.prefFilter(vm.$store.state.prefData, true)
    expect(vm.prefNowCase).toBe('2,667')
    expect(vm.prefNowPercentage).toBe(0.01912)
    expect(vm.prefName).toBe('東京都')
    expect(vm.prefPopulation).toBe('13,942,856')
  })
  it('method-check', () => {
    const value = vm.$store.state.prefData
    const result = `+${value.cases.today - value.cases.yesterday}`
    vm.check(result, true)
    expect(vm.comparisonCases).toBe('+218')
  })
})