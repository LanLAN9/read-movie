var postData = require('../test/local_data.js');
var app = getApp();
Page({
  data: {
    isPlaying: false,
  },

  onLoad: function(options) {
    // wx.clearStorageSync();
    // console.log(options.id);
    //引用及运用id序号
    var postId = options.id;
    //将序号存入data,以便本文件里面引用
    this.data.currentpostid = postId;
    //根据点击序号获取相应json数据
    var post_data = postData.postList[postId];
    //将整个json数据存入data，给其它页面或本身使用
    this.setData({
      eacharticle: post_data,
    });

    var grobel_isPlaying = app.grobel_isPlaying;

    this.iconCollectionChange();

    this.iconMusicChange();

    this.listenPlay();

    wx.onBackgroundAudioStop(()=>{
      console.log("music stop!");
      wx.playBackgroundAudio({
        dataUrl: this.data.eacharticle.musicurl,
        title: this.data.eacharticle.musicname,
        coverImgUrl: this.data.eacharticle.coverImgUrl,
      });
    })
  },

  //音乐播放图标和播放状态更换
  iconMusicChange: function() {
    if (app.grobel_isPlaying && app.grobel_isPlayingnum == this.data.currentpostid) {
      this.setData({
        isPlay: app.grobel_isPlaying
      });
    }
  },

  //收藏图标切换
  iconCollectionChange: function() {
    var postcollection = wx.getStorageSync('post_collection');
    if (postcollection) { //页面加载，继承之前操作的信息结果（如：之前如果进行了收藏操作，将操作获取过来）
      if (!postcollection[this.data.currentpostid]) { //避免部分文章处于初始化状态，但是post_collection非空存入了其它文章的数据，所以导致postcollection[postId]为空，后续进行数据data存入时报错
        postcollection[this.data.currentpostid] = false;
      }
      var postcollected = postcollection[this.data.currentpostid];
      this.setData({
        collection: postcollected
      });
    } else { //初始化存入一个空对象
      var postcollection = {};
      postcollection[this.data.currentpostid] = false;
      wx.setStorageSync('post_collection', postcollection);
    };
  },

  //监听音乐播放和停止事件
  listenPlay: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      app.grobel_isPlaying = true;
      that.data.isPlaying = true;
      that.setData({
        isPlay: app.grobel_isPlaying
      })
    });
    wx.onBackgroundAudioPause(function() {
      app.grobel_isPlaying = false;
      that.data.isPlaying = false;
      that.setData({
        isPlay: app.grobel_isPlaying
      })
    })
  },

  collectionTap: function(event) {
    var postcollection = wx.getStorageSync("post_collection");
    var postcollected = postcollection[this.data.currentpostid];
    //收藏变取消，取消变收藏
    postcollected = !postcollected;
    //将改变的数值更新到存储里面
    postcollection[this.data.currentpostid] = postcollected;
    wx.setStorageSync("post_collection", postcollection);
    this.setData({
      collection: postcollected
    });


    wx.showToast({
      title: postcollected ? "收藏成功" : "取消收藏",
      icon: 'success',
      duration: 1000,
    })
  },

  shareTap: function() {
    var itemlists = [
      '分享到朋友圈',
      '分享到好友',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemlists,
      // itemColor: '#405f80',
      success: function(res) {
        // res.tapIndex 用户点击的元素序号 从0开始
        console.log(res.tapIndex);
        //res.cancel用户是否点击了取消
        console.log(res.cancel);
        wx.showModal({
          title: '提示',
          content: itemlists[res.tapIndex] + '目前无法实现！'
        })
      }
    })
  },
  onaudio: function() {
    var isPlaying = this.data.isPlaying;
    isPlaying = !isPlaying;
    this.setData({
      isPlay: isPlaying
    });
    var that = this;
    if (isPlaying) {
      wx.playBackgroundAudio({
        dataUrl: that.data.eacharticle.musicurl,
        title: that.data.eacharticle.musicname,
        coverImgUrl: that.data.eacharticle.coverImgUrl,
      });
      app.grobel_isPlayingnum = that.data.currentpostid;
    } else {
      wx.pauseBackgroundAudio();
      app.grobel_isPlayingnum = null;
    }

    wx.showToast({
      title: isPlaying ? '正在播放' : '播放关闭',
    });
    this.data.isPlaying = isPlaying;

    // wx.getBackgroundAudioPlayerState({
    //   success(res) {
    //     const status = res.status;
    //     const dataUrl = res.dataUrl;
    //     const currentPosition = res.currentPosition;
    //     const duration = res.duration;
    //     const downloadPercent = res.downloadPercent;
    //     // console.log(res);
    //   }
    // })

  },


})