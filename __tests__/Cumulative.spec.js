import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import initStore from '@/modules/storeModule.js'
import Cumulative from '@/components/Cumulative.vue'


const localVue = createLocalVue()
localVue.use(Vuex)

describe('Cumulative.vue', () => {
  let getters
  let store
  let wrapper
  let vm

  beforeEach(() => {
    getters = {
      numComma: jest.fn()
    }
    store = new Vuex.Store({
      state: {
        ratio:{
        pref_id: "13",
        prefecture: "東京都",
        cases: "23828",
        population: "13942856",
        deaths: "390",
        pcr: "408414",
        hospitalize: "2230",
        severe: "26",
        discharge: "21208",
        created_at: "20200919"
    }},
      getters
    })
    wrapper = shallowMount(Cumulative, { store, localVue})
    vm = wrapper.vm
  })
  it('%表示が正しいか', () => {
    vm.percentage(vm.$store.state.ratio)
    expect(vm.pcrPercentage).toBe('2.9291')
    expect(vm.casesPercentage).toBe('0.1708')
    expect(vm.deathPercentage).toBe('1.63%')
    console.log("store",vm.$store.state)
  })
})