// components/topLink/topLink.js
const app = getApp()
import {
  interval
} from '../../utils/util'
Component({

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    score: '0',
  },

  properties: {
    openid: {
      type: String,
      observer: function (newVal) {
        if (newVal)
          this.getUserGameInfo({
            openid: newVal
          }).then(res => {
            this.showScore(res, {
              openid: newVal
            })
          })
      }
    }
  },

  lifetimes: {

    attached: function () {

    },

    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openPay: function () {
      this.triggerEvent('show', {
        show: true
      })
    },

    //获取用户游戏信息
    getUserGameInfo: function (openid) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${app.globalData.serverUrl}/getUserGameInfo`,
          data: openid,
          success: (result) => {
            resolve(result)
          },
          fail: (err) => {
            reject(err)
            throw new Error(err)
          },
        })
      })
    },

    //判断用户游戏币
    showScore: function (res, openid) {
      if (res.data === null) { //用户的成绩不存在
        wx.request({
          url: `${app.globalData.serverUrl}/setUserGameInfo`,
          method: 'POST',
          data: JSON.stringify(openid),
          success: (result) => {
            this.setData({
              score: result.data.score
            })
            app.globalData.userGameInfo = result.data
          },
          fail: (err) => {
            console.log(err);
            throw new Error(err);
          },
        })
      } else if (typeof res.data === 'object') { //用户的成绩已经存在
        //判断用户登录时间
        const {
          days
        } = interval(parseInt(res.data.game_time), +new Date())
        if (days > 1) {
          this.setData({
            score: 100
          })
          app.globalData.userGameInfo = 100
        } else {
          this.setData({
            score: res.data.score
          })
          app.globalData.userGameInfo = res.data.score
        }
      }
    }
  }
});