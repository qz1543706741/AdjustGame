// components/topLink/topLink.js
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
    score:'0',
  },

  attached: function() {
    // 在组件实例进入页面节点树时执行
    
    console.log(this.data.score);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openPay: function (){
      this.triggerEvent('show',{
        log:1111
      })
    }
  }
});
