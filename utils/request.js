// 用Promise封装wx.request()

const {baseUrl} = require('config.js');


const request = function(obj){
  return new Promise((resolve,reject)=>{
    if(!obj.hideLoading){
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    }
    wx.request({
      url: baseUrl + obj.url,
      data: obj.data,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: obj.method || 'POST',
      success: res=>{
        if (!obj.hideLoading) wx.hideLoading();

        if (res.data.status.code == -1 || res.data.status.code == 200) { // 200 系统错误
          wx.showToast({
            title: res.data.status.message,
            icon: "none",
            duration: 2000,
            mask: true  
          })
        }
        resolve(res);
      },
      fail: res=>{
        reject(res);
      },
      complete: res=>{

      },
    })
  })
}
module.exports = request;