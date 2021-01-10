// pages/template/template.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: getApp().globalData.imageUrl
  },

  onLoad(){
    console.log(this.data.imageUrl);
  }

})