// const util = require('../utils/utils.js');
import util from "../utils/util.js";
import myCrypt from "../myCrypt/myCrypt.js";
import Vue from "vue";
import router from "@/router";

var md5 = require("../md5.js");

import Axios from "axios";

let verison = 10023;

Axios.defaults.baseURL = "http://193.168.58.191:8080/zykj-api/operationweb/";
Axios.defaults.timeout = 120000;
Axios.defaults.headers.common.Accept = "application/json";
Axios.defaults.withCredentials = true;

Axios.interceptors.response.use(
  response => {
    if (router.currentRoute.path.indexOf("/home") != -1) {
      if (response.data.error_code == 19004) {
        //token已过期！请重新登录！
        Vue.prototype.$message({
          type: "error",
          duration: "2000",
          message: response.data.message,
          onClose: () => {
            location.reload();
          }
        });
      }
    }
    return response;
  },
  error => {
    return error; // 返回接口返回的错误信息
  }
);
function postRequest(uniqueFunc, inputData, expand, uploadplan) {
  if (util.trim(uniqueFunc).length == 0) return false;

  const token = localStorage.getItem("token") || "";

  var postData = requestData(uniqueFunc, inputData, expand, token);

  return Axios({
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    data: postData,
    onUploadProgress: uploadplan
  });
}

/**
 * 请求数据处理
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
