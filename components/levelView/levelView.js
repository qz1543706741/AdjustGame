// components/topLink/pay/pay.js
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
      //console.log(Object.entries(detail));
      if (this.formVerify(Object.entries(detail))) {
        //todo 提交表单
        console.log('true');
        getCurrentPages()[0].setData({
          show: this.properties.modalShow
        })
      }



    }
  },
  options: {
    multipleSlots: true
  }
})