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
    vm.now(value[0], value[1])//[0]today,[1]yesterday
    expect(vm.nowCase).toBe('2,375')
    expect(vm.nowPercentage).toBe('0.01703')
    expect(vm.comparisonCases).toBe('+29人')
  })
})