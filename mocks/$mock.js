/* eslint-disable */
import mockServer from 'axios-mock-server'
import mock0 from './_testData'

export default (client) => mockServer([
  {
    path: '/_testData',
    methods: mock0
  }
], client, '')
