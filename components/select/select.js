Component({
  behaviors: ['wx://form-field'], //内置behaviors，使自定义组件有类似于表单控件的行为。
  properties: {
    options: {
      type: Array,
      value: [],
    },
    optionsKeys: {
      type: Array,
    },
    defaultOption: {
      type: Object,
      value: {
        key: '000',
        value: '请先填写校代码'
      }
    },
    name: {
      type: String
    },
    value: {
      type: Object
    }

  },
  data: {
    isShow: false,
    current: {}
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.setData({
        current: dataset,
        isShow: false,
        value: dataset
      });
    },
    openClose() {
      this.triggerEvent('showAddBtn')
      this.setData({
        isShow: !this.data.isShow,
      })
    },

    // 此方法供父组件调用
    close() {
      this.setData({
        isShow: false
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        current: Object.assign({}, this.data.defaultOption),
      })
    }
  }
})