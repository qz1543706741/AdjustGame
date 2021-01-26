// components/topLink/pay/pay.js
const {
  formVerify,
  debounce
} = require('../../utils/util')
const app = getApp()
//防抖timer
let timer = null
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [],
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
    imageUrl: getApp().globalData.imageUrl,
    inputValue: {},
    majorOptions: {}
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
        // Object.entries(detail).forEach(items => {
        //   if (items[0].indexOf('info') > -1) {
        //     const keyArray = items[0].split('_info')
        //     const key = keyArray[0]
        //     const temp = isNaN(parseInt(items[1])) ? '_name' : '_code'
        //     keyArray.shift()
        //     delete detail[items[0]]
        //     Object.assign(detail, {
        //       [key + temp + keyArray.toString()]: items[1]
        //     })
        //   }
        // })

        //对表单数据进行处理
        Object.keys(detail).forEach(key => {
          if (key.indexOf('school') > -1){
            const temparr = detail[key].split(/[\(\)\s)]/).filter(item=>item!=='')
            detail[key] = {
              key:temparr[0],
              value:temparr[1]
            }
          }
        })
        
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

    //输入
    inputHandeler: function (e) {
      //防抖
      timer = debounce(this.inputDataOperate.bind(this, e), timer)
    },

    //对输入框信息进行处理
    inputDataOperate: function (e) {
      const {
        value
      } = e.detail
      const {
        name
      } = e.currentTarget.dataset
      if (isNaN(value)) return
      if (name === 'adjust_school_info' || name === 'undergraduate_school_info')
        this.getSchoolName(name, value)
    },

    //根据院校代码查询院校名称
    getSchoolName: async function (name, value) {
      if (app.globalData.schoolInfo[value]) {
        const inputValue = this.data.inputValue
        const majorOptions = this.data.majorOptions
        const majorResult = await this.getMajorName(value)
        Object.assign(inputValue, {
          [name]: {
            schoolName: app.globalData.schoolInfo[value].school_name,
            schoolCode: value,
          }
        })
        Object.assign(majorOptions, {
          [name.replace(/school/, 'major')]: majorResult
        })
        this.setData({
          inputValue,
          majorOptions
        })
      }
    },

    //获取专业列表
    getMajorName: function (schoolCode) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${app.globalData.serverUrl}/getSchoolMajorInfo`,
          method: 'GET',
          data: {
            schoolCode,
          },
          success: (res) => {
            resolve(res.data instanceof Array ? res.data.map(item => {
              const {
                major_code,
                major_name,
              } = item
              return {
                major_code,
                major_name
              }
            }) : [])
          },
          fail: err => {
            reject(err)
          }
        })
      })
    },

  },
  options: {
    multipleSlots: true
  }
})