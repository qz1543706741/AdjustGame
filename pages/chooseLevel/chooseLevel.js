// pages/chooseLevel/chooseLevel.js
const app = getApp()
const proxy = app.watch()
const {
  userBasicInfoForm,
  singleForm,
  gameLevelList
} = require('../../utils/level.config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    imageUrl: app.globalData.imageUrl,
    show: false,
    levelid: '',
    gameLevelList: gameLevelList,
    formTitle: '玩家基本信息',
    form: userBasicInfoForm,
    titleShow: false,
    levelForm: [singleForm, singleForm]
  },
  onLoad() {
    try {
      if (!wx.getStorageSync('user_basic_info'))
        this.setData({
          show: true,
        })
    } catch (err) {
      throw new Error(err)
    }
  },

  // 校验玩家是否通过关卡
  isPassedLevel(levelid) {

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
    const that = this
    const show = this.data.show

    console.log();
    this.setData({
      show: !show,
      form: that.data.levelForm[levelid],
      // formTitle: '请填写调剂院校信息',
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
    //判断玩家是否通过本关
    if (!this.data.gameLevelList[levelid].isPassed)
      this.showToast(levelid)


  },

  showPay: function (e) {
    this.setData({
      show: e.detail.show
    })
  }
});