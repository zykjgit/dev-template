import util from "../utils/util.js";
import myCrypt from "../myCrypt/myCrypt.js";
import Vue from "vue";
import router from "@/router";
import {setToken,getToken,clearToken} from '@/public/utils.js'
var md5 = require("../md5.js");

import axios from "axios";
let isShowEorro = true;
const Axios = axios.create({
  baseURL:"http://193.168.58.189:8080/zykj-api/operationweb/",
  timeout:120000,
  headers:{
    common:{
      Accept:"application/json"
    }
  },
  withCredentials:true
});

let verison = 10023;


Axios.interceptors.response.use(
  response => {
    const {error_code,message} = response.data;
      if(error_code === 19004) {
        if(router.currentRoute.path !== '/login') {
          Vue.prototype.$message({
            type: "warning",
            duration: "2000",
            message: '登录过期请重新登录',
          });
        }
        if(router.currentRoute.fullPath === '/login') {
          setToken(response.data.data.token)
        } else {
          router.push("/login");
          clearToken();
        }
        return response
      }
      if(error_code === 19005) {
        Vue.prototype.$message({
          type: "warning",
          duration: "2000",
          message: message
        });
        clearToken();
        router.push("/login");
        // setToken(response.data.token)
        return response
      }
    return response

  },
  error => {
    Vue.prototype.$message({
      type: "warning",
      duration: "2000",
      message: error.message
    });
    return error; // 返回接口返回的错误信息
  }
);

/** 
 * postRequest
 * 对错误提示和存取token进行封装的请求函数
 * @param {String} uniqueFunc 请求的方法和模块 api路由相关
 * @param {Object} inputData 发送post请求的数据体
 * @param {*} expand 忽略
 * @param {*} uploadplan 忽略
 * @param {Boolean} showEorro 是否提示错误！
 * @example
 * // 返回一个 Promise对象。只有在error_code === 0的情况下为 resloved,其他情况均为rejected;错误信息会被自动拦截并提示！
 * postRequest('manage/login',{account:111,password:1111}).then(res => {
 *  if(res) {
 *    message('sucess')
 *  }
 * })
 */
function postRequest(uniqueFunc, inputData, expand, uploadplan,showEorro = true) {
  isShowEorro = showEorro;
  if (util.trim(uniqueFunc).length == 0) return false;

  const token = getToken("token") || "";
  var postData = requestData(uniqueFunc, inputData, expand, token);
   return Axios({
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: postData,
    onUploadProgress: uploadplan
  }).then(response => {
    const {error_code,message} = response.data;

    if (showEorro) {
      if(error_code === 0) {
        return Promise.resolve(response.data.data);
     } else {
       if((error_code +'')[0] === '3') {
         Vue.prototype.$message({
           type: "warning",
           duration: "2000",
           message: message
         });
       }
       if((error_code +'')[0] === '2') {
         Vue.prototype.$message({
           type: "warning",
           duration: "2000",
           message: message
         });
       }
       if(error_code === -1) {
         Vue.prototype.$message({
           type: "warning",
           duration: "2000",
           message: message
         });
       }
    }
       return Promise.reject(response.data)
    }
  }).catch(err => console.log(err))
}

/**
 * 请求数据加密处理
 */
function requestData(uniqueFunction, inputData, expand, token) {
  var encryptData = {};
  let staffId = 0;
  encryptData["function"] = uniqueFunction;
  encryptData["unique_data"] =
    staffId +
    "|" +
    verison +
    "|" +
    new Date()
      .getTime()
      .toString()
      .substr(0, 10) +
    "|" +
    "education_platform_web_" +
    token +
    "|" +
    1488485 +
    "|" +
    util.GUID();
  encryptData["api_version"] = verison;
  encryptData["token"] = token;
  encryptData["input_data"] = util.sortDict(inputData);

  var encryptDataJson = JSON.stringify(encryptData);
  var encryptDataStr = myCrypt.encrypt(
    encryptDataJson,
    "AA2C56AA88857030EBC333930BEDB99E"
  );
  var expandData = expand != null ? expand : {};
  var expandDataJson = JSON.stringify(expandData);
  var signStr = md5.hex_md5(
    encryptDataStr +
      "&" +
      expandDataJson +
      "&" +
      "2D19ADD19DF3B9BFA692CB1362883F8E"
  );
  var random = util.GUID();
  signStr =
    signStr.substring(0, 10) +
    random.substring(0, 5) +
    signStr.substring(10, 20) +
    random.substring(5, 10) +
    signStr.substring(20, 30) +
    random.substring(10, 15) +
    signStr.substring(30, 32);
  // var returnData = {
  //   encrypt: encryptDataStr,
  //   expand: expandDataJson,
  //   sign: signStr
  // };
  var formData = new FormData();
  formData.append("encrypt", encryptDataStr);
  formData.append("expand", expandDataJson);
  formData.append("sign", signStr);
  // var strHtml =
  //   process.env.baseUrl +
  //   "?" +
  //   "encrypt=" +
  //   encryptDataStr +
  //   "&" +
  //   "expand=" +
  //   expandDataJson +
  //   "&" +
  //   "sign=" +
  //   signStr;
  return formData;
}
export default postRequest;
