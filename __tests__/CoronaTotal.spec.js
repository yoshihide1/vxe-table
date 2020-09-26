import {createLocalVue, shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import { getters } from '@/store/index.js'
import {state} from '@/modules/storeModule.js'
import CoronaTotal from '@/components/CoronaTotal.vue'
import CoreuiVue from '@coreui/vue';

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(CoreuiVue)

describe('CoronaTotal.vue', () => {
  let store
  let wrapper
  let vm

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters
    })
    wrapper = shallowMount(CoronaTotal, {store, localVue})
    vm = wrapper.vm
  })
  it('method-coronaTable', () => {
    vm.coronaTable(vm.$store.state.allCoronaData)
    expect(vm.tableData).toStrictEqual([{"cases": 1996, "casesRatio": "+12", "deaths": 107, "deathsRatio": "±0", "discharge": 1784, "dischargeRatio": "+16", "hospitalize": 105, "hospitalizeRatio": -4, "pcr": 54197, "pcrRatio": "+433", "population": 5248552, "pref_id": 1, "prefecture": "北海道", "severe": 1, "severeRatio": "±0"}, {"cases": 24046, "casesRatio": "+218", "deaths": 391, "deathsRatio": "+1", "discharge": 21378, "dischargeRatio": "+170", "hospitalize": 2278, "hospitalizeRatio": "+48", "pcr": 411359, "pcrRatio": "+2945", "population": 13942856, "pref_id": 13, "prefecture": "東京都", "severe": 25, "severeRatio": -1}])
  })
})
