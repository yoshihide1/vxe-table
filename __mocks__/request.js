const axios = require('axios')
async function request(req) {
  const res = await fetch('../src/assets/prefectures.json')
  return res
 }

 request().then((res) => {
   console.log(res)
 }).catch((err) => {
   console.log("err:",err)
 })