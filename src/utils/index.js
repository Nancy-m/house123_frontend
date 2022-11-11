/**
 * 时间戳
 * @param {*} timestamp  时间戳
 */
 const timestampToTime = (timestamp) => {
  let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M =
      (date.getMonth() + 1 < 10 ?
          '0' + (date.getMonth() + 1) :
          date.getMonth() + 1) + '-'
  let D =
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':'
  let s =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
};
/**
* 存储localStorage
*/
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
      content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
* 获取localStorage
*/
const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
* 删除localStorage
*/
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
* 设置cookie
**/
function setCookie(name, value, day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  document.cookie = name + '=' + value + ';expires=' + date;
};

/**
* 获取cookie
**/
function getCookie(name) {
  let reg = RegExp(name + '=([^;]+)');
  let arr = document.cookie.match(reg);
  if (arr) {
      return arr[1];
  } else {
      return '';
  }
};

/**
* 删除cookie
**/
function delCookie(name) {
  setCookie(name, null, -1);
};

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
      return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
      date = time;
  } else {
      if (typeof time === 'string' && new RegExp('^[0-9]+$').test(time)) {
          time = parseInt(time);
      }
      if (typeof time === 'number' && time.toString().length === 10) {
          time = time * 1000;
      }
      date = new Date(time);
  }
  const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
* 导出 
**/
export {
  timestampToTime,
  setStore,
  getStore,
  removeStore,
  setCookie,
  getCookie,
  delCookie,
  parseTime
}