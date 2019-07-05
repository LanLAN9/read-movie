var movie_data = require('movie-data/local-data.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.setData({
        movieData: movie_data.movieList
      });
    // this.moveList();
    },
    clearbutton: function() {
      wx.clearStorageSync();
    },
    onmoreMove: function(event) {
      var movieBoxId = event.currentTarget.dataset.movieboxid;
      var movieTitle = event.currentTarget.dataset.movietitle;
      wx.navigateTo({
        url: './more-movie/more-movie?movieBoxId=' + movieBoxId + '&movieTitle=' + movieTitle,
      })
    },
    onmap: function() {
      wx.navigateTo({
        url: '../map/map',
      })
    },
    // moveList: function() {
    //   24 wx.showToast({
    //     25 title: '正在加载',
    //     26 icon: 'loading',
    //     27 duration: 5000
    //   });
    //   let thisPage = this;
    //   30 wx.request({
    //     31 url: 'https://api.douban.com/v2/movie/in_theaters',
    //     32 method: 'GET',
    //     33 header: {
    //       34 "Content-Type": "json"
    //       35
    //     },
    //     36 success: function(res) {
    //       37 thisPage.setData({
    //         38 moves: res.data.subjects,
    //         39
    //       });
    //       40 console.log(res.data.subjects)
    //       41 wx.hideLoading();
    //     },
    //     43
    //   })
    //   44
    // }

    // moveList:function(){
    //   wx.showToast({
    //     title: '正在加载',
    //     icon:'loading',
    //     duration:5000
    //   });
    //   let thisPage=this;
    //   wx.request({
    //     url: 'https://douban.uieee.com/v2/movie/subject/' ,
    //     method:'GET',
    //     header:{
    //       "Content-Type": "json"
    //     },
    //     success:function(res){
    //       console.log(res);
    //       console.log(res.data.subjects);
    //       wx.hideLoading();
    //     }
    //   })
    // }
  })

  