// pages/more-movie/more-movie.js
var moviedata=require('../movie-data/local-data.js')
Page({

  
  data: {

  },

 
  onLoad: function (options) {
    var movieBoxId = options.movieBoxId;
    var movieTitle=options.movieTitle;
    this.data.navigattitle = movieTitle;

    var movie_data = moviedata.movieList;
    this.setData({
      movieData: movie_data
    });
  },

  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.navigattitle
    })
  },
  onbindcofirm:function(event){
    var value=event.detail.value;
    wx.showModal({
      title: '提示',
      content: '您搜索的内容' + value+'无法查询！！！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  }
  
})