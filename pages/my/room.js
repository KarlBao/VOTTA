// pages/my/room.js
Page({
  data:{
    rooms: []
  },
  onLoad:function(options){
    var app = getApp();
    var rooms = app.getRoomStorage();
    rooms = rooms.map(function(room) {
      var url = '';
      switch(parseInt(room.type)) {
        case 1:
          url = '/pages/room/enroll?room='+room.uid
      }
      room.url = url;
      return room;
    });
    console.log(rooms)
    this.setData({
      rooms: rooms
    })
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
  }
})