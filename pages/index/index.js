// index.js
// 获取应用实例

const app = getApp();
const {
  getLoginCode,
  getLoginInfo
} = require('../../utils/util.js')

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  insertUserInfo: function (data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.serverUrl + '/setUserInfo',
        data,
        success: (res) => {
          resolve(res)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  },

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      const userLoginInfo = async () => {
        try {
          const code = await getLoginCode()
          const loginInfo = await getLoginInfo(code)
          return await this.insertUserInfo({
            ...(e.detail.userInfo),
            ...loginInfo.data
          })
        } catch (err) {
          console.error(err);
        }
      }

      userLoginInfo().then((r)=>{
        console.log(r);
        wx.navigateTo({
          url: '../chooseLevel/chooseLevel'
        });
      })

    }

  },



});