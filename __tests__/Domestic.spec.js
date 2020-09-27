import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { getters } from '@/store/index.js'
import { state } from '@/modules/storeModule.js'
import Domestic from '@/components/Domestic.vue'
import CoreuiVue from '@coreui/vue';

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(CoreuiVue);

describe('Domestic.vue', () => {
  let store
  let wrapper
  let vm

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters
    })
    wrapper = shallowMount(Domestic, { store, localVue })
    vm = wrapper.vm
  })
  it('method-now', () => {
    const value = vm.$store.state.ratio
    vm.now(value[1], value[0])//[1]today,[0]yesterday
    expect(vm.nowCase).toBe('2,346')
    expect(vm.nowPercentage).toBe('0.01682')
    expect(vm.comparisonCases).toBe('-29人')
  })
})