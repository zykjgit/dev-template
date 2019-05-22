export const getToken = () => localStorage.getItem('token');
export const setToken = token => localStorage.setItem('token', token);
export const clearToken = () => localStorage.clear();

//格式化时间
export const formartDate = (date, type = 'datetime') => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
  if (type == 'datetime') {
    return `${year}-${month}-${day} ${hours}:${minute}:${second}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};

//函数防抖主要解决用户快速点击重复请求数据；
export const debounce = (method, delay) => {
  let timer = null;
  return function(...rest) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      method.apply(this, rest);
    }, delay);
  };
};

/**
 *  金额的转换 由于服务器返回的金额是以分为单位，需要用该函数转换成员
 * @param {Number,String} num 金额
 * @param {Number} type 类型 默认为1 转成分 ，穿其他数字表示转为元；
 */
export const transformMoney = (num, type = 1) => {
  if (typeof num !== 'string') {
    num = num + '';
  }
  num = num.replace(/\s+/g, '');
  if (num == 0) return 0;
  if (type == 1) {
    let strArr = (num + '00').split('.');
    let result = strArr[0];
    if (strArr[1]) {
      let second = strArr[1].substr(0, 2);
      result = result + second;
    }
    if (result[0] === '0') {
      result = result.substr(1);
    }
    return Number(result);
  } else {
    return (num / 100).toFixed(2);
  }
};
