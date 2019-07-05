var postData=require('local_data.js');


Page({
  data: {

  },
  viewMore:function(event){
    /*分四步：
    1.给数据分别一个id
    2.将id序号绑到标签上
    3.点击时获取当前标签的id序号，并将其通过页面跳转一并交给跳转页面
    4.跳转页面通过option获取跳转地址里面携带的id序号，加以应用
    */
    var postId=event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../article-detail/article-detail?id=' + postId,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function(options) {
    // this.data.postlist = postData.postList
    //与下面的效果差不多
    this.setData({
      article: postData.postList
    });
    // this.setData(postData);
  },

})