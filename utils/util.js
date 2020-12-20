const app = getApp();

const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res.code)
      },
      fail: (res) => {
        reject(res.errMsg)
      }
    })
  })
}
const getLoginInfo = (code) => {
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
      fail: (res) => {
        reject(res)
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  getLoginCode: getLoginCode,
  getLoginInfo: getLoginInfo
};