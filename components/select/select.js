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
    name: {
      type: String
    },
    value: {
      type: Object
    }

  },
  data: {
    isShow: false,
    current: {
      key: '000',
      value: '',
      showText: '请先填写校代码'
    }
  },
  methods: {
    optionTap(e) {
      let dataset = e.target.dataset
      this.triggerEvent('showAddBtn')
      this.setData({
        current: {
          showText: `(${dataset.key}) ${dataset.value}`,
          ...dataset
        },
        isShow: false,
        value: dataset
      });
      console.log(this.data.current);
      this.triggerEvent('getSelectedItem',{...this.data.current})
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
})