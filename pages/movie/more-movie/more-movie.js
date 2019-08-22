
Page({


  data: {

  },


  onLoad: function (options) {
    this.moveList();
    
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigattitle
    })
  },
  onbindcofirm: function (event) {
    var value = event.detail.value;
    wx.showModal({
      title: '提示',
      content: '您搜索的内容' + value + '无法查询！！！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },
  moveList: function () {
    wx.showToast({
      title: '正在加载',
      icon: 'loading',
      duration: 5000
    });
    let thisPage = this;
    wx.request({
      url: 'https://douban-api.now.sh/v2/movie/top250?start=1&count=15',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        wx.hideLoading();
        thisPage.setData({
          lotsmovie: res.data.subjects,
        });
      }
    })
  }
})