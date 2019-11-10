export const showToast = (title, icon, duration, mask) => {
  wx.showToast({
    title,
    icon: icon || "none",
    duration: duration || 2000,
    mask: mask === false ? false : true
  })
}



export const showLoading = (title, mask) => {
  wx.showLoading({
    title,
    mask: mask === false ? false : true
  })
}