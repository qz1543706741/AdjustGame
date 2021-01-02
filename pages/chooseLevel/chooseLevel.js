// pages/chooseLevel/chooseLevel.js
const app = getApp()
const proxy = app.watch()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    show: false,
    levelid: '',
    gameLevelList: [{
        lable: '单人填报',
        levelId: '0',
        extendClass: 'animate__delay-1s',
        isPassed: false,
        isBggray: false
      },
      {
        lable: '人机对战',
        levelId: '1',
        extendClass: 'animate__delay-2s',
        isPassed: false,
        isBggray: true
      },
      {
        lable: '真实对战',
        levelId: '2',
        extendClass: 'animate__delay-3s',
        isPassed: false,
        isBggray: true
      }
    ]
  },

  // 校验玩家是否通过关卡
  isPassedLevel() {
    return proxy.userGameInfo
  },

  // 关卡选择后的回调
  handleFunc(e) {
    const {
      levelid
    } = e.currentTarget.dataset
    switch (levelid) {
      case '0':
        this.showSingle(levelid);
        break;
      case '1':
      case '2':
      default:
        break;
    }

  },

  //关卡模态框
  showModal: function (levelid) {
    const show = this.data.show
    this.setData({
      show: !show,
      levelid
    })
  },

  //是否继续闯关
  showToast: function (levelid) {
    wx.showModal({
      content: '玩家是否继续闯关',
      success: ({
        confirm
      }) => {
        if (confirm)
          this.showModal(levelid)
        else
          return
      },
      fail: () => {
        return
      }
    })
  },


  showSingle: function (levelid) {
    console.log(levelid);
    //判断玩家是否通过本关
    if (!this.data.gameLevelList[levelid].isPassed)
      this.showToast(levelid)


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
    // console.log(app.watch()); 
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