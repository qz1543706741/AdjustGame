// pages/chooseLevel/chooseLevel.js
const app = getApp()
const proxy = app.watch()
const {
  userBasicInfoForm,
  singleForm,
  gameLevelList
} = require('../../components/levelView/level.config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    imageUrl: app.globalData.imageUrl,
    score: '',
    show: false,
    levelid: null,
    gameLevelList: gameLevelList,
    formTitle: '玩家基本信息',
    form: userBasicInfoForm,
    titleShow: false,
    levelForm: [singleForm, singleForm]
  },
  onLoad() {
    try {
      if (!wx.getStorageSync('userBasicInfo'))
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

  // 关卡选择后的处理函数
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
    this.setData({
      show: !show,
      form: that.data.levelForm[levelid],
      formTitle: levelid ? '调剂院校基本信息' : '',
      titleShow: levelid ? '调剂院校基本信息' : '',
      levelid
    })
  },
  //处理用户积分
  setUserScore: function (oldScore, extraInfo) {
    this.setData({
      score: oldScore - 20,
      ...extraInfo
    })
    const userGameInfo = wx.getStorageSync('userGameInfo')
    wx.setStorageSync('userGameInfo', Object.assign(userGameInfo, {
      score: oldScore - 20,
    }))
  },

  //是否继续闯关
  showToast: function (levelid) {
    wx.showModal({
      content: '玩家是否继续闯关',
      success: ({
        confirm
      }) => {
        if (confirm) {
          const userGameInfo = wx.getStorageSync('userGameInfo')
          if (userGameInfo.score >= 20) {
            this.showModal(levelid)
          } else {
            wx.showToast({
              title: '您的积分不够，请充值或明天再来挑战',
              icon: 'none'
            })
          }
        } else
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
  },

  //处理表单组件提交事件
  formSubmit: function (options) {
    const {
      detail
    } = options
    
    this.setUserScore(wx.getStorageSync('userGameInfo').score, detail)
  }


});