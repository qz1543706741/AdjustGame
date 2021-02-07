// components/adjustDetail/adjustDetail.js
Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field'],
  properties: {
    majorList: {
      type: Array
    },
    value: {
      type: String,
      value: '1111'
    },
    name: {
      type: String
    }
  },

  lifetimes: {
    attached() {
      const subjectInfo = wx.getStorageSync('variable_form_single')
      let adjustDetail = wx.getStorageSync('adjustDetail')
      if (adjustDetail) {
        subjectInfo.forEach((item,index) => {
          item.subject_info = {
            'politicsCourse': {
              'subject_name': adjustDetail[index].subject_info[0].list[0],
              'subject_core': 50
            },
            'foreignCourse': {
              'subject_name': adjustDetail[index].subject_info[1].list[0],
              'subject_core': 50
            },
            'majorCourse_1': {
              'subject_name': adjustDetail[index].subject_info[2].list[0],
              'subject_core': 100
            },
            'majorCourse_2': {
              'subject_name': adjustDetail[index].subject_info[3].list[0],
              'subject_core': 100
            },
          }
        })
        wx.setStorageSync('variable_form_single', subjectInfo)
        console.log(subjectInfo);
        this.setData({
          majorList: adjustDetail
        }, () => {
          setTimeout(() => {
            wx.hideToast()
          }, 300)
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showCourseInfoSelect: [],
    scoreUnder100: [...new Array(100).keys()],
    scoreAbove100: [...new Array(150).keys()],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //政治picker
    changePicker: function (e) {
      const {
        subject_name,
        subject_index,
        major_index
      } = e.currentTarget.dataset
      const {
        value
      } = e.detail
      console.log(e);
      const majorList = this.data.majorList
      let subjectInfo = wx.getStorageSync('variable_form_single')
      //为课程信息picker赋值
      subjectInfo[major_index].subject_info[subject_name].subject_name = majorList[major_index].subject_info[subject_index].list[value[0]]
      subjectInfo[major_index].subject_info[subject_name].subject_core = value[1]
      wx.setStorageSync('variable_form_single', subjectInfo)
    },

    endPicker: function (e) {
      // console.log(2, e);
    },

    pickerDragend: function (detail) {

    }
  }
})