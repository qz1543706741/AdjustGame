// index.js
// 获取应用实例

const app = getApp();

const {
  toLineObject
} = require('../../utils/util.js')

Page({
  data: {
    userInfo: app.globalData.userInfo,
    imageUrl: app.globalData.imageUrl,
  },

  addtUserInfo: function (data) {
    return new Promise((resolve, reject) => {
      this.setData({
        userInfo: data
      })
      app.globalData.userInfo = data
      wx.setStorageSync('userInfo', data)
      wx.request({
        url: `${app.globalData.serverUrl}/setUserInfo`,
        data: JSON.stringify(toLineObject(data)),
        method: 'POST',
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },
  getLoginCode: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })

  },
  getLoginInfo: function (code) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.logUrl,
        data: {
          appid: wx.getAccountInfoSync().miniProgram.appId,
          secret: '307d806d2f8954766c33d9be00ad429f',
          grant_type: 'authorization_code',
          js_code: code
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })

  },

  userLoginInfo: async function (extendInfo) {
    try {
      const {
        code
      } = await this.getLoginCode()

      const {
        data
      } = await this.getLoginInfo(code)

      await this.addtUserInfo({
        ...extendInfo,
        ...data
      })
    } catch (err) {
      throw new Error(err.errMsg)
    }
  },

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      if (!wx.getStorageSync('userInfo')) {
        wx.showLoading({
          title: '获取数据中',
        })
        this.userLoginInfo(e.detail.userInfo)
          .then(() => {
            wx.hideLoading()
            wx.redirectTo({
              url: '../chooseLevel/chooseLevel'
            })
          })
      } else {
        app.globalData.userInfo = wx.getStorageSync('userInfo')
        wx.redirectTo({
          url: '../chooseLevel/chooseLevel'
        })
      }

    }

  },



});