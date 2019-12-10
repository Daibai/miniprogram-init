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
 * @param {boolean} option.style - 格式'YY-MM-DD hh:mm:ss'
 * @return {string} - 返回格式化的日期【"2019-01-12 16:00:00"】
 */
function formateDate(date, {
  style = 'YY-MM-DD hh-mm-ss',
  frontJoin = '-'
} = {
  style: 'YY-MM-DD hh:mm:ss',
  frontJoin: '-'
}) {
  if (!date) date = new Date();
  else if (typeof date === 'number' || typeof date === 'string') date = new Date(date);
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  let hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let mid = style.match(/\s+/),
    midJoin = style.substr(mid.index, mid.length);

  let fullRes = [year, month, day].map(item => formateNumnber(item)).join(frontJoin) + midJoin + [hours, minutes, seconds].map(item => formateNumnber(item)).join(':');
  let midInx = fullRes.indexOf(midJoin);
  let front = fullRes.slice(midInx - mid.index, midInx),
    behind = fullRes.substr(midInx + mid.length, style.length - mid.index - mid.length);

  return front + midJoin + behind;

  function formateNumnber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
}
/**
 * 正则相关
 */
class Regular {
  constructor() {}
  //匹配非空文本
  text(data) {
    if (/\S+/.test(data) && data) return true;
    else return false;
  }
  //匹配手机号
  phone(data) {
    // return /^1[3|4|5|7|8|9][0-9]{9}$/.test(data);
    return /^1\d{10}$/.test(data);
  }
  //匹配手机号（不严格）
  phone(data) {
    return /^1\d{10}$/.test(data);
  }
  //匹配数字(各种数字)
  number(data) {
    return /^((0\.\d*[1-9]+\d*)|([1-9]+0*((\.\d+)|(\d*))))$/.test(data);
  }
  //匹配正整数
  posInt(data) {
    return /^[1-9]\d*$/.test(data);
  }
  //保留3位以内的小数
  in3xiaoshu(data) {
    return /^(([1-9]\d*)|((0|([1-9]\d*))\.\d{1,3}))$/.test(data);
  }
}

//数字小数补齐
function formateKeyValue(obj, twoDigs, oneDigs, threeDigs) {
  Array.isArray(twoDigs) && twoDigs.map(item => {
    if (obj[item] === undefined) {
      return;
    }
    obj[item] = obj[item] + '';
    if (obj[item].includes('.')) {
      let digsNum = obj[item].split('.')[1].length;
      if (digsNum == 0) obj[item] = obj[item] + '00';
      else if (digsNum == 1) obj[item] = obj[item] + '0';

    } else {
      obj[item] = obj[item] + '.00';
    }
  });

  Array.isArray(oneDigs) && oneDigs.map(item => {
    if (obj[item] === undefined) {
      return;
    }
    obj[item] = obj[item] + '';
    if (obj[item].includes('.')) {
      let digsNum = obj[item].split('.')[1].length;
      if (digsNum == 0) obj[item] = obj[item] + '0';
    } else {
      obj[item] = obj[item] + '.0';
    }
  });

  Array.isArray(threeDigs) && threeDigs.map(item => {
    if (obj[item] === undefined) {
      return;
    }
    obj[item] = obj[item] + '';
    if (obj[item].includes('.')) {
      let digsNum = obj[item].split('.')[1].length;
      if (digsNum == 0) obj[item] = obj[item] + '000';
      else if (digsNum == 1) obj[item] = obj[item] + '00';
      else if (digsNum == 2) obj[item] = obj[item] + '0';
    } else {
      obj[item] = obj[item] + '.000';
    }
  });
}

// 节流函数
function preventMoreTap() {
  let globalLastTapTime = 0;
  return function(e) {
    let timeStamp = e.timeStamp;
    if (globalLastTapTime != 0 && Math.abs(timeStamp - globalLastTapTime) < 500) {
      globalLastTapTime = timeStamp;
      return true;
    } else {
      globalLastTapTime = timeStamp;
      return false;
    }
  }
}


//千位分隔符

let thousandBitSeparator = (() => {
  let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g
  let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g
  return (num) => num && num.toString()
    .replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ','))
})()

//url query2Json
const query2Json = (path) => {
  let res = {};
  if (!path || typeof path != 'string') return res;
  let paramArr = path.split('?')[1].split('&');
  for (let item of paramArr) {
    let key = item.split('=')[0],
      value = item.split('=')[1];
    res[key] = value;
  }
  return res;
}

module.exports = {
  formatTime,
  regular: new Regular(),
  formateDate,
  preventMoreTap,
  thousandBitSeparator,
  formateKeyValue,
  query2Json
}