// app.js
App({
  onLaunch: function () {
    
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
    serverUrl: 'http://10.221.197.151:3000',
    imageUrl:'https://image-1304509895.cos.ap-nanjing.myqcloud.com/',
    logUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
  },

});