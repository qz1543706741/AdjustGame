// components/topLink/topLink.js
const app = getApp()
const proxy = app.watch(({
  userGameInfo
}) => {
  getCurrentPages()[0].setData({
    userGameInfo,
    ['gameLevelList[0].isPassed']: userGameInfo.level_single,
    ['gameLevelList[1].isPassed']: userGameInfo.level_computer,
    ['gameLevelList[2].isPassed']: userGameInfo.level_player,
    ['gameLevelList[0].isBggray']: userGameInfo.level_single,
    ['gameLevelList[1].isBggray']: !userGameInfo.level_computer,
    ['gameLevelList[2].isBggray']: !userGameInfo.level_player
  })
})
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
    imageUrl: app.globalData.imageUrl
  },
  lifetimes: {
    attached() {
      this.setData({
        openid: app.globalData.userInfo.openid || ''
      })
    }
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
            wx.setStorageSync('userGameInfo', result.data)
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
            wx.setStorageSync('userGameInfo', result.data)
            proxy.userGameInfo = result.data
          },
          fail: (err) => {
            throw new Error(err);
          },
        })
      } else if (typeof res.data === 'object') { //用户的成绩已经存在
        proxy.userGameInfo = res.data
        //判断用户登录时间
        const {
          days
        } = interval(parseInt(res.data.game_time), +new Date())
        if (days > 1 && res.data.score === 0) {
          wx.request({
            url: `${app.globalData.serverUrl}/setUserGameInfo`,
            method: 'POST',
            data: JSON.stringify(openid),
            success: () => {
              this.setData({
                score: 100
              })
              proxy.userGameInfo.score = 100
            },
            fail: (err) => {
              throw new Error(err);
            },
          })
        } else {
          this.setData({
            score: res.data.score
          })
        }
        wx.setStorageSync('userGameInfo', proxy.userGameInfo)
      }
    },

  }
});