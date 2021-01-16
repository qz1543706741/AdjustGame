const app = getApp();

const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

//批量修改对象属性名（驼峰——>下划线）
function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function toLineObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).map((item) => {
      return [toLine(item[0]), item[1]];
    })
  );
}

//计算时间间隔
function interval(old, now) {
  const stime = Date.parse(new Date(old));
  const etime = Date.parse(new Date(now));
  const usedTime = etime - stime; //两个时间戳相差的毫秒数
  const days = Math.floor(usedTime / (24 * 3600 * 1000));
  //计算出小时数
  const leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  const time = days + "天" + hours + "时" + minutes + "分";
  return {
    days,
    hours,
    minutes,
    time
  }
}

//表单校验
function formVerify(form, rules) {
  if (!rules)
    rules = {
      nickname: /^[\u4E00-\u9FA5A-Za-z]+$/,
      age: /^\d{2,}$/,
      adjust_school_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_major_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_school_info_01: /^[\u4e00-\u9fa5]{1,}$|^[0-9]+$/,
      adjust_major_info_01: /^[\u4e00-\u9fa5]{1,}$|^[0-9]+$/,
      adjust_school_info_02: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_major_info_02: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_school_info_03: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_major_info_03: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_school_info_04: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_major_info_04: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      undergraduate_school_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      undergraduate_major_info: /^[\u4e00-\u9fa5]{0,}$|^[0-9]*$/,
      adjust_score: /^[0-9]*$/,
      undergraduate_rank: /^[0-9]*$/,
    }
  if (form instanceof Array)
    return form.every((currentValue) => {
      if (rules[currentValue[0]].test)
        return rules[currentValue[0]].test(currentValue[1]) || rules[currentValue[0]].test(parseInt(currentValue[1]))
      return true
    })
}

//防抖函数
function debounce(callback, timer, waitTime = 500) {
  if (timer) clearTimeout(timer)
  return setTimeout(() => {
    callback()
  }, waitTime);
}

module.exports = {
  formVerify,
  formatTime,
  toLineObject,
  interval,
  debounce
};