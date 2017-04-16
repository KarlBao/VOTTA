Page({
  data: {
    title: '',
    description: ''
  },
  // 用户提交
  submit: function() {
    var app = getApp();
    // 获取用户信息
    app.getUserInfo(this.publish)
  },
  // 发送请求
  publish: function(userInfo) {
    wx.request({
      url: 'http://localhost/liteappapi/index.php/room',
      data: {
        creator_avatar: userInfo.avatarUrl,
        creator_name: userInfo.nickName,
        title: this.data.title,
        description: this.data.description,
        type: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var result = res.data;
        var roomId = result.data.room_id;
        // 成功后重定向到创建的房间
        wx.navigateTo({
          url: '/pages/room/enroll?room='+roomId
        })
      }
    })
  },
  setTitle: function(e) {
    var value = e.detail.value;
    this.setData({
      title: value
    })
  },
  setDescription: function(e) {
    var value = e.detail.value;
    this.setData({
      description: value
    })
  }
})