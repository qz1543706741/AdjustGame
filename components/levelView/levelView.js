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
      //表单校验
      if (!formVerify(Object.entries(detail))) {
        wx.showToast({
          title: '表单信息提交有误，请重新提交',
          icon: 'none'
        })
      } else {
        if (!this.data.levelid) { //提交用户基本信息
          //对表单数据进行处理
          Object.keys(detail).forEach(key => {
            if (key.indexOf('school') > -1) {
              const temparr = detail[key].split(/[\(\)\s)]/).filter(item => item !== '')
              detail[key] = {
                key: temparr[0],
                value: temparr[1]
              }
            }
          })
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
          switch (this.data.levelid) {
            case '0':
              this.singLevelAjax(detail);
              break;
            default:
              break;
          }
        }
      }
    },

    //单人关卡数据提交
    singLevelAjax: function (detail) {
      wx.request({
        url: `${app.globalData.serverUrl}/setUserAdjustInfo`,
        method: 'POST',
        data: JSON.stringify({
          variable_form_single: detail.variable_form_single,
          openid: app.globalData.userInfo.openid
        }),
        success: () => {
          app.globalData.userAdjustInfo = detail;
          try {
            this.triggerEvent('formSubmit', {
              show: this.properties.modalShow,
              ...detail
            })
          } catch (error) {
            console.log(error);
            throw new Error(error)
          }
        }
      })
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
      if (name === 'adjust_school_info' || name === 'undergraduate_school_info') {
        wx.showLoading({
          title: '',
        })
        this.getSchoolName(name, value)
      }

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
        wx.hideLoading()
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

    //展示调剂院校成绩填报页面
    showAdustDetail: function ({
      detail
    }) {
      //隐藏填报志愿表单
      this.setData({
        ['form[0].isSelectGroupShow']: false
      })
      wx.showToast({
        title: '正在根据您的填报志愿生成填报单',
        icon:'none',
        duration:9999,
        success: () => {
          wx.request({
            url: `${app.globalData.serverUrl}/getAdjustDetail`,
            method: 'POST',
            data: JSON.stringify(detail),
            success: (res) => {
              //console.log(res);
              let adjust_detail = []
              res.data.forEach((item, index) => {
                adjust_detail.push({
                  label: '调剂志愿',
                  group_index: index + 1,
                  ...item
                })
              })
              wx.setStorageSync('adjustDetail', adjust_detail)
              this.setData({
                ['form[0].adjust_detail']: adjust_detail,
                //根据用户选择的调剂志愿，获取调剂填报card
                ['form[0].isAdjustDetailShow']: true
              })
              wx.hideToast()
            }
          })
        }
      })
    }

  },
  options: {
    multipleSlots: true
  }
})