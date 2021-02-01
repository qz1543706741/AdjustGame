// components/adjustDetail/adjustDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    majorList: {
      type: Array
    }
  },

  lifetimes: {
    attached() {
      if (wx.getStorageSync('adjustDetail')) {
        const showCourseInfoSelect = wx.getStorageSync('adjustDetail').map(() => true)
        this.setData({
          majorList: wx.getStorageSync('adjustDetail'),
          showCourseInfoSelect: showCourseInfoSelect
        })
      }


    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCourseInfoSelect: [],
    scoreUnder100: [...new Array(100).keys()],
    scoreAbove100: [...new Array(150).keys()],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getCourseInfo: function (e) {
      const index = e.currentTarget.dataset.index
      const isCourseInfoSelected = this.data.showCourseInfoSelect[index]

    }
  }
})