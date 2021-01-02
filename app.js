// app.js
App({
  onLaunch: function () {
    if (this.loginCallback) {
      this.loginCallback()
    }
  },

  //监听全局变量的变化
  watch: function (callback) {
    return new Proxy(this.globalData, {
      get: function () {
        return Reflect.get(...arguments)
      },
      set: function () {
        Reflect.set(...arguments)
        if (callback) callback([...arguments][0])
        return true
      },
    })
  },

  globalData: {
    userInfo: null,
    userGameInfo: {},
    serverUrl: 'http://localhost:3000',
    logUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
  },

});