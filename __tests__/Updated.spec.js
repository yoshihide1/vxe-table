import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { state } from '@/modules/test-storeModule.js'
import Updated from '@/components/Updated.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let wrapper
let vm

describe('Updatede', () => {

  beforeEach(() => {
    store = new Vuex.Store({
      state
    })
    wrapper = shallowMount(Updated, { store, localVue })
    vm = wrapper.vm
  })

  it('日付の表示', () => {
    vm.lastUpdate("2020-10-25")
    expect(vm.updated).toBe("最終更新日2020年10月25日")
    vm.lastUpdate("2020-05-09")
    expect(vm.updated).toBe("最終更新日2020年05月09日")
  })
})
