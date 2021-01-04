// pages/chooseLevel/chooseLevel.js
const app = getApp()
const proxy = app.watch()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    show: true,
    levelid: '',
    gameLevelList: [{
        lable: '单人填报',
        levelId: '0',
        extendClass: '',
        isPassed: false,
        isBggray: false
      },
      {
        lable: '人机对战',
        levelId: '1',
        extendClass: 'animate__delay-1s',
        isPassed: false,
        isBggray: true
      },
      {
        lable: '真实对战',
        levelId: '2',
        extendClass: 'animate__delay-2s',
        isPassed: false,
        isBggray: true
      }
    ],
    formTitle: '玩家基本信息',
    form: [{
      lable: '玩家昵称',
      template_name: 'input',
      flex: 'flex-row',
      name:'nickname'
    }, {
      lable: '玩家年龄',
      template_name: 'input',
      flex: 'flex-row',
      name:'age'
    }, {
      lable: '考研信息',
      template_name: 'label',
      flex:'flex-column'
    }, {
      lable: '考研所报院校代码或名称',
      template_name: 'input',
      flex:'flex-column',
      name:'adjust_school_info'
    }, {
      lable: '考研所报专业代码或名称',
      template_name: 'input',
      flex:'flex-column',
      name:'adjust_major_info'
    }, {
      lable: '考研分数',
      template_name: 'input',
      flex: 'flex-row',
      name:'adjust_score'
    }, {
      lable: '本科信息',
      template_name: 'label',
      flex:'flex-column',
      name:'nickname'
    }, {
      lable: '本科院校代码或名称',
      template_name: 'input',
      flex:'flex-column',
      name:'undergraduate_school_info'
    }, {
      lable: '本科专业代码或名称',
      template_name: 'input',
      flex:'flex-column',
      name:'undergraduate_major_info'
    }, {
      lable: '本科排名',
      template_name: 'input',
      flex: 'flex-row',
      name:'undergraduate_rank'
    }]
  },

  onLoad() {

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
      formTitle: '请填写调剂院校信息',
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

  // submit:function(){
  //   console.log(123);  
  // },

  showPay: function (e) {
    this.setData({
      show: e.detail.show
    })
  }
});