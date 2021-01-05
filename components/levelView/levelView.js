// components/topLink/pay/pay.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalShow: {
      type: Boolean,
    },
    title: {
      type: String,
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
      console.log(this.properties.modalShow);
      getCurrentPages()[0].setData({
        show: this.properties.modalShow
      })
    },
    //表单校验
    formVerify: function (form, rules) {
      if (rules === undefined)
        rules = {
          nickname: /^[\u4E00-\u9FA5A-Za-z]+$/,
          age: /^\d{2,}$/,
          adjust_school_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
          adjust_major_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
          undergraduate_school_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
          undergraduate_major_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
          adjust_score: /^[0-9]*$/,
          undergraduate_rank: /^[0-9]*$/
        }
      if (form instanceof Array)
        return form.every((currentValue) => {
          //console.log(rules[currentValue[0]].test(currentValue[1]));
          if (rules[currentValue[0]].test)
            return rules[currentValue[0]].test(currentValue[1]) || rules[currentValue[0]].test(parseInt(currentValue[1]))
          return true
        })
    },
    //表单提交
    formSubmit: function (e) {
      const detail = e.detail.value
      if (this.formVerify(Object.entries(detail))) {
        console.log(detail);
        console.log(JSON.stringify(detail));
        Object.entries(detail).forEach(items => {
          if (items[0].indexOf('info') > -1) {
            const key = items[0].split('_info')[0] 
            const temp =  isNaN(parseInt(items[1])) ? '_name' : '_code'
            // + isNaN(parseInt(items[1])) ? '_name' : '_code'
            delete detail[items[0]]
            Object.assign(detail, {
              [key+temp]: items[1]
            })
          }
        })
        //todo 提交表单
        wx.request({
          url: `${app.globalData.serverUrl}/setUserBasicInfo`,
          method: 'POST',
          data: JSON.stringify({
            ...detail,
            openid:app.globalData.userInfo.openid
          }),
          success: (res) => {
            console.log(res);
            app.globalData.user_basic_info = detail;
            try {
              wx.setStorageSync('user_basic_info', detail)
              getCurrentPages()[0].setData({
                user_basic_info: detail,
                show: this.properties.modalShow
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
    }
  },
  options: {
    multipleSlots: true
  }
})