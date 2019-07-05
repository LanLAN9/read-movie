// pages/otheraudio/otheraudio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentday:'2018-08-06'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  onCurrentChoose: function (event) {
    var chooseday = event.detail.value;
    this.setData({
      currentday: chooseday
    })
  },
  formSubmit:event=>{
    console.log("触发提交按钮！");
    console.log(event);
    console.log(event.detail);
    console.log(event.detail.value);
  },
  formReset:(event)=>{
    console.log("触发reset按钮！");
    console.log(event);
    console.log(event.detail);
    console.log(event.detail.value);
  }
})