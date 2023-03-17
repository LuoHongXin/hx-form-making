/*
 * @Author: luohongxin
 * @Date: 2022-04-29 14:11:59
 */
import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from './config';
import { getCookie } from '@src/utils/common.js';
const setDefaultParams = params => {
  return params;
};

const resolve = function(response, success) {
  // const status = response.statue || response.status
  success(response);
};

const reject = function(response, error) {
  if (error) {
    error(response);
  }
};

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  timeout: 100000, // request timeout
});

// 拦截请求
service.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      };
    }
    let currentOrgUuid = getCookie('organization');
    config.headers['currentOrgUuid'] = currentOrgUuid;
    // cas和identify路径的请求不要/aggregation
    const notPrefix = ['/identify', '/loginUser', '/logout', '/login', '/system-manager'];
    // cas路径的请求不要/api
    if (config.url.indexOf('/cas') > -1) {
      config.baseURL = '';
    } else if (notPrefix.some(u => config.url.includes(u))) {
      config.baseURL = '/api';
    }
    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
);

// 拦截响应
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  response => {
    const res = response.data;
    // removePendingAjax(response)
    return res;
  },
  error => {
    // if (error.response.status === 401) {
    //   window.app.$router.push({ name: "login" });
    // }
    // 考虑后端框架不稳定，报500，处理后端返回错误提示。
    if (error.response) {
      const data = error.response.data;
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

service.get = (path, params, success, error) => {
  const paramsData = Object.assign(
    {
      t: new Date().getTime(),
    },
    params
  );
  params = setDefaultParams(paramsData);
  const res = service({
    url: path + '?' + qs.stringify(params),
    method: 'get',
    data: params,
    transformRequest: function(obj) {
      let ret = '';
      for (const it in obj) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(obj[it]) + '&';
      }
      return ret;
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res.then(
    response => {
      resolve(response, success, error);
    },
    response => {
      reject(response, error);
    }
  );
};

service.post = (path, params, success, error) => {
  params = setDefaultParams(params);
  const res = service({
    url: path,
    method: 'post',
    params: params,
  });
  res.then(
    response => {
      resolve(response, success, error);
    },
    response => {
      reject(response, error);
    }
  );
};

service.postJson = (path, params, success, error) => {
  params = setDefaultParams(params);
  const res = service({
    url: path,
    method: 'post',
    data: params,
    transformRequest: function(obj) {
      return JSON.stringify(obj);
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  res.then(
    response => {
      resolve(response, success, error);
    },
    response => {
      reject(response, error);
    }
  );
  return res;
};

export default service;
