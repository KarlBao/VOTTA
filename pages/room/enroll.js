// pages/room/enroll.js
Page({
  data:{
    title: '标题',
    description: '描述',
    joinUsers: [],
    joinNum: 0,
    queryParams: {}
  },
  onLoad:function(params){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      queryParams: params
    })

    this.getRoomData(this.data.queryParams.room)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  storeRoom: function() {
    var app = getApp();
    var self = this;
    var rooms = app.getRoomStorage(); // 已经存储的房间
    var duplicateRoom = rooms.filter(function(room) {
      return room.uid == self.data.queryParams.room;
    })
    // 已经存在了， 不再重复存储
    if(duplicateRoom.length !== 0) {
      return false;
    } else {
      // 存储
      var roomData = {
        uid: self.data.queryParams.room,
        title: self.data.title,
        type: 1
      };

      rooms.push(roomData);
      wx.setStorageSync('myRoom', rooms)
    }
  },
  getRoomData: function(roomId) {
    var self = this;
    wx.request({
      url: 'http://localhost/liteappapi/index.php/room/'+roomId,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        var result = res.data.data;
        var roomData = result.room;
        var joinUsers = result.join_users;
        self.setData({
          title: roomData.title,
          description: roomData.description,
          joinUsers: joinUsers,
          joinNum: joinUsers.length
        })
      }
    })
  },
  join: function() {
    var app = getApp();
    var self = this;
    app.getUserInfo(function(userInfo) {
      wx.request({
        url: 'http://localhost/liteappapi/index.php/room/join',
        method: 'POST',
        data: {
          room: self.data.queryParams.room,
          user_avatar: userInfo.avatarUrl,
          user_name: userInfo.nickName
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log('报名成功惹~~~')
          var joinUsers = self.data.joinUsers;
          var userData = {
            user_avatar: userInfo.avatarUrl,
            user_name: userInfo.nickName
          }

          joinUsers.push(userData);

          self.setData({
            joinUsers: joinUsers,
            joinNum: joinUsers.length
          })

          // 报名后把房间信息存储在localStorage
          self.storeRoom();
        }
      })
    })
  }
})