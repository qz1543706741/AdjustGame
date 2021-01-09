// components/topLink/pay/pay.js
const {
  formVerify
} = require('../../utils/util')
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleShow: {
      type: Boolean,
    },
    modalShow: {
      type: Boolean,
    },
    hasAddBtn: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
    },
    levelid:{
      type:String
    },
    form: {
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageUrl: getApp().globalData.imageUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭对话框
    closeModal: function () {
      getCurrentPages()[0].setData({
        show: this.properties.modalShow
      })
    },

    //表单提交
    formSubmit: function (e) {
      const detail = e.detail.value
      if (formVerify(Object.entries(detail))) {
        //对表单特殊字段进行处理
        Object.entries(detail).forEach(items => {
          if (items[0].indexOf('info') > -1) {
            const key = items[0].split('_info')[0]
            const temp = isNaN(parseInt(items[1])) ? '_name' : '_code'
            delete detail[items[0]]
            Object.assign(detail, {
              [key + temp]: items[1]
            })
          }
        })
        //todo 提交表单
        wx.request({
          url: `${app.globalData.serverUrl}/setUserBasicInfo`,
          method: 'POST',
          data: JSON.stringify({
            ...detail,
            openid: app.globalData.userInfo.openid
          }),
          success: () => {
            app.globalData.userBasicInfo = detail;
            try {
              wx.setStorageSync('userBasicInfo', detail)
              this.triggerEvent('formSubmit', {
                show: this.properties.modalShow,
                ...detail
              })
            } catch (error) {
              throw new Error(error)
            }
          }
        })
      } else {
        wx.showToast({
          title: '表单信息提交有误，请重新提交',
          icon: 'none'
        })
      }
    },

    //添加表单项
    addinput: function () {
      console.log(this.data.form);
      console.log(this.data.levelid);
      const form = this.data.form;
      //创建新的表单项
      const formItem = [{
        
      }]
    }
  },
  options: {
    multipleSlots: true
  }
})