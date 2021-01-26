// components/selectGroup/selectGroup.js
const {
  singleForm
} = require('../levelView/level.config')
const {
  debounce
} = require('../../utils/util')
let timer = null
const app = getApp()
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
    animate__slideInDown: '',
    has_add_btn: true,
    add_btn_url: app.globalData.imageUrl + 'add.png',
    selectList: [{
      group_index: '',
      adjust_school_info: '',
      adjust_major_info: ''
    }]
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
        const temp = Object.assign({}, formItem[0], {
          group_index: group_index + 1,
          schoolName: '',
          majorOptions: [],
          showText:'',
          schoolCode: '',
        })
        console.log(temp);
        //新的item添加进入form
        formItem.push(temp)
        this.setData({
          form_item: formItem,
          animate__slideInDown: 'animate__slideInDown'
        })
        setTimeout(() => {
          this.setData({
            animate__slideInDown: ''
          })
        }, 1750);
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
        index
      } = e.currentTarget.dataset

      if (isNaN(value)) return
      else {
        this.getSchoolName(value, index)
      }
    },

    //根据院校代码查询院校名称
    getSchoolName: async function (value, index) {
      if (app.globalData.schoolInfo[value]) {
        const {
          school_name
        } = app.globalData.schoolInfo[value]
        this.setData({
          [`form_item[${index}].showText`]: `(${value}) ${school_name}`,
          [`form_item[${index}].schoolCode`]: value,
          [`form_item[${index}].schoolName`]: school_name
        })
        // const majorOptions = this.data.majorOptions
        //const majorResult = await this.getMajorName(value)
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

    //隐藏按钮
    showAddBtn: function () {
      if (this.data.has_add_btn)
        this.setData({
          has_add_btn: !this.data.has_add_btn
        })
      else {
        setTimeout(() => {
          this.setData({
            has_add_btn: !this.data.has_add_btn
          })
        }, 500)
      }

    }
  }
})