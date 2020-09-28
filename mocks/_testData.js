import sampleData from '../src/assets/testData.json'

const prefData = [
  { id: 0, name: 'taro' },
  { id: 1, name: 'hanako' }
]

export default {
  get({ values }) {
    console.log(values)
    return [200, prefData.find(pref => pref.id === values.testData)]
  }
}
