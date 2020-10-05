export const getters = {
  prefDataFilter: (state) => (id) => {
    return state.allCoronaData.find(pref => pref.pref_id == id)
  },

  numComma: () => (num) => {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  },

  numCheck: () => (num) => {
    if (num > 0) return "red";
    if (num < 0) return "blue";
    return "green"
  },

  dischargeAndPcr: () => (num) => {
    if (num > 0) return "blue"
    return "green"
  },

  comparison: () => (data, item) => {
    const num = data[item].today - data[item].yesterday
    if (num === 0) return `±${num}`
    if (num > 0) return `+${num}`
    return num
  },

  dateFormat: () => (date) => {
    const a = date.slice(4, 6)
    const b = date.slice(6, 9)
    return `${Number(a)}月${b}日`;
  },
}