// components/selectGroup/selectGroup.js
const {
  singleForm
} = require('../levelView/level.config')
const {
  debounce
} = require('../../utils/util')
let timer = null
const app =getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    form_item: singleForm[0]['form_item'],
    has_add_btn: true,
    add_btn_url: app.globalData.imageUrl + 'add.png',
  },
  /**
   * 组件的方法列表
   */
  methods: {

    //添加表单项
    addinput: function () {
      const formItem = this.data.form_item
      const group_index = formItem.length
      if (group_index < 4) {
        //创建一个新的item
        const temp = Object.assign({}, form.form_item[0], {
          group_index: group_index + 1
        })

        //新的item添加进入form
        formItem.push(temp)
        this.setData({
          form_item: formItem
        })
      } else {
        wx.showToast({
          title: '最多可添加四个调剂志愿',
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
      console.log(e);
      // if (isNaN(value)) return
      // if (name === 'adjust_school_info' || name === 'undergraduate_school_info')
      //   this.getSchoolName(name, value)
    },

    //根据院校代码查询院校名称
    getSchoolName: async function (name, value) {
      if (app.globalData.schoolInfo[value]) {
        const inputValue = this.data.inputValue
        const majorOptions = this.data.majorOptions
        const majorResult = await this.getMajorName(value)
        // Object.assign(inputValue, {
        //   [name]: {
        //     schoolName: app.globalData.schoolInfo[value].school_name,
        //     schoolCode: value,
        //   }
        // })
        // Object.assign(majorOptions, {
        //   [name.replace(/school/, 'major')]: majorResult
        // })
        // this.setData({
        //   inputValue,
        //   majorOptions
        // })
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
  }
})