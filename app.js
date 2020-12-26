// app.js
App({
  onLaunch: function () {
    if(this.loginCallback){
      this.loginCallback()
    }
  },
  globalData: {
    userInfo: null,
    serverUrl:'http://localhost:3000',
    logUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
  },

});