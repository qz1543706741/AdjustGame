// pages/chooseLevel/chooseLevel.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    show: false,
    modle:''
  },

  // 校验玩家是否通过关卡
  isPassedLevel(level) {

  },

  // 单人填报
  handleSingle(e) {
    const show = this.data.show
    const {modle} = e.currentTarget.dataset
    console.log();
    this.setData({
      show: !show,
      modle,
    })
  },

  // 人机对战
  handleComputer(e) {
    const show = this.data.show
    const {modle} = e.currentTarget.dataset
    this.setData({
      show: !show,
      modle,
    })
  },

  // 真实对战
  handlePlayer(e) {
    const show = this.data.show
    const {modle} = e.currentTarget.dataset
    this.setData({
      show: !show,
      modle,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(() => wx.hideLoading(), 1000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  showPay: function (e) {
    this.setData({
      show: e.detail.show
    })
  }
});