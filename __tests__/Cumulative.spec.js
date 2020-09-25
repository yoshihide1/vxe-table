import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { getters } from '@/store/index.js'
import { state } from '@/modules/storeModule.js'
import Cumulative from '@/components/Cumulative.vue'


const localVue = createLocalVue()
localVue.use(Vuex)

describe('Cumulative.vue', () => {
  let store
  let wrapper
  let vm

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters//store/index.js
    })
    wrapper = shallowMount(Cumulative, { store, localVue })
    vm = wrapper.vm
  })
  it('method-cumulative', () => {
    vm.cumulative(vm.$store.state.ratio[0])
    expect(vm.pcr).toBe('(408,414人)')
    expect(vm.cases).toBe('(23,828人)')
    expect(vm.deaths).toBe('390')//人は後付け
  })
  it('method-percentage', () => {
    vm.percentage(vm.$store.state.ratio[0])
    expect(vm.pcrPercentage).toBe('2.9291')//文字列として%後付け
    expect(vm.casesPercentage).toBe('0.1708')//文字列として%後付け
    expect(vm.deathPercentage).toBe('1.63%')
  })
  it('method-comparison', () => {
    const value = vm.$store.state.ratio
    vm.comparison(value[1], value[0])//[1]today,[0]yesterday
    expect(vm.comparisonPcr).toBe('+2,945')
    expect(vm.comparisonCases).toBe('+218')
    expect(vm.comparisonDeaths).toBe('+1')
  })

})