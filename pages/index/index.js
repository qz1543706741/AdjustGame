// index.js
// 获取应用实例

const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.login({
        success: (res) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: app.globalData.logUrl,
            data: {
              appid: wx.getAccountInfoSync().miniProgram.appId,
              secret: '307d806d2f8954766c33d9be00ad429f',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            success: (res) => {
              wx.request({
                url: app.globalData.serverUrl + '/setUserInfo',
                data: {
                  ...e.detail.userInfo,
                  ...res.data
                },
                success: (res) => {
                  console.log(res);
                }
              })
            }
          })
        }
      });
      wx.navigateTo({
        url: '../chooseLevel/chooseLevel'
      });
    }

  }
});