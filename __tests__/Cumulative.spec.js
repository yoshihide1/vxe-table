import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { getters } from '@/store/index.js'
import { state } from '@/modules/storeModule.js'
import Cumulative from '@/components/Cumulative.vue'
import CoreuiVue from '@coreui/vue';


const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(CoreuiVue);

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
    expect(vm.pcr).toBe('(412,653人)')
    expect(vm.cases).toBe('(24,306人)')
    expect(vm.deaths).toBe('391')//人は後付け
  })
  it('method-percentage', () => {
    vm.percentage(vm.$store.state.ratio[0])
    expect(vm.pcrPercentage).toBe('2.9596')//文字列として%後付け
    expect(vm.casesPercentage).toBe('0.1743')//文字列として%後付け
    expect(vm.deathPercentage).toBe('1.6%')
  })
  it('method-comparison', () => {
    const value = vm.$store.state.ratio
    vm.comparison(value[0], value[1])//[0]today,[1]yesterday
    expect(vm.comparisonPcr).toBe('+1,294')
    expect(vm.comparisonCases).toBe('+98')
    expect(vm.comparisonDeaths).toBe('+1')
  })

})