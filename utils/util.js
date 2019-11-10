const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
  * 获取格式化的日期
  * @param {objct|number|string} date - 日期对象|时间戳|'2019-1-1'
  * @param {object} option - 配置对象
  * @param {boolean} option.hasTime - 是否需要时间(12:00:00) default：true
  * @param {string} option.joinSymbol - 日期的连接符号 default："-"
  * @return {string} - 返回格式化的日期【"2019-01-12 16:00:00"】
  */
function formateDate(date, { hasTime = true, joinSymbol = '-' } = { hasTime: true, joinSymbol: '-' }) {
  if (!date) date = new Date();
  else if (typeof date === 'number' || typeof date === 'string') date = new Date(date);
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  let res = [year, month, day].map(item => formateNumnber(item)).join(joinSymbol);
  if (hasTime) {
    let hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();
    return res + ' ' + [hours, minutes, seconds].map(item => formateNumnber(item)).join(':');
  } else {
    return res;
  }
  function formateNumnber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
}
/**
 * 正则相关
 */
class Regular {
  constructor() {
  }
  //匹配非空文本
  text(data) {
    if (/\S+/.test(data) && data) return true;
    else return false;
  }
  //匹配手机号
  phone(data) {
    return /^1[3|4|5|7|8|9][0-9]{9}$/.test(data);
  }
  //匹配数字(各种数字)
  number(date) {
    return /^((0\.0*[1-9]+0*)|([1-9]+0*((\.\d+)|(\d*))))$/.test(data);
  }

}


// 节流函数
function preventMoreTap() {
  let globalLastTapTime = 0;
  return function (e) {
    let timeStamp = e.timeStamp;
    if (globalLastTapTime != 0 && Math.abs(timeStamp - globalLastTapTime) < 500) {
      globalLastTapTime = timeStamp;
      return true;
    }
    else {
      globalLastTapTime = timeStamp;
      return false;
    }
  }
}
module.exports = {
  formatTime,
  regular: new Regular(),
  formateDate,
  preventMoreTap

}
