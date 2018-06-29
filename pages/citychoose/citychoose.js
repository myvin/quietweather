let staticData = require('../../data/staticData.js')
Page({
  data: {
    hotCities: [],
    cities: []
  },
  // 按照字母顺序生成需要的数据格式
  getSortedAreaObj(areas) {
    // let areas = staticData.areas
    areas = areas.sort((a, b) => {
      if (a.letter > b.letter) {
        return 1
      }
      if (a.letter < b.letter) {
        return -1
      }
      return 0
    })
    let obj = {}
    for (let i = 0, len = areas.length; i < len; i++) {
      let item = areas[i]
      delete item.districts
      let letter = item.letter
      if (!obj[letter]) {
        obj[letter] = []
      }
      obj[letter].push(item)
    }
    // 返回一个对象，直接用 wx:for 来遍历对象，index 为 key，item 为 value，item 是一个数组
    return obj
  },
  choose(e) {
    let item = e.currentTarget.dataset.item
    let name = item.name
    let pages = getCurrentPages()
    let len = pages.length
    let indexPage = pages[len - 2]
    indexPage.setData({
      // 是否切换了城市
      cityChanged: true,
      // 需要查询的城市
      searchCity: name,
    })
    wx.navigateBack({})
  },
  onLoad () {
    this.setData({
      cities: this.getSortedAreaObj(staticData.cities || []),
    })
  },
})