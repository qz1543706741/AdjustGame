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
    title: {
      type: String,
    },
    levelid: {
      type: String
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
            const keyArray = items[0].split('_info')
            const key = keyArray[0]
            const temp = isNaN(parseInt(items[1])) ? '_name' : '_code'
            keyArray.shift()
            delete detail[items[0]]
            Object.assign(detail, {
              [key + temp + keyArray.toString()]: items[1]
            })
          }
        })
        console.log(detail);
        if (this.data.levelid)
          wx.request({
            url: `${app.globalData.serverUrl}/setUserAdjustInfo`,
            method: 'POST',
            data: JSON.stringify({
              ...detail,
              openid: app.globalData.userInfo.openid
            }),
            success: () => {
              app.globalData.userAdjustInfo = detail;
              try {
                wx.setStorageSync('userAdjustInfo', detail)
                this.triggerEvent('formSubmit', {
                  show: this.properties.modalShow,
                  ...detail
                })
              } catch (error) {
                throw new Error(error)
              }
            }
          })
        //提交用户基本信息
        else
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
      const form = this.data.form[0];
      const group_index = form.form_item.length
      if (group_index < 4) {
        //创建一个新的item
        const temp = Object.assign({}, form.form_item[0], {
          group_index: group_index + 1
        })

        //新的item添加进入form
        form.form_item.push(temp)
        this.setData({
          form: [form]
        })
      } else {
        wx.showToast({
          title: '最多可添加四个调剂志愿',
          icon: 'none'
        })
      }
    }
  },
  options: {
    multipleSlots: true
  }
})