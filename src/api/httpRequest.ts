import Request from 'luch-request';
import type { HttpMethod, HttpRequestConfig } from 'luch-request';
import { useUserStore } from '@/store';

const http = new Request();

/**
 * 全局配置修改 setConfig
 */
http.setConfig(config => {
  config.header = {
    ...config.header
  };

  return config;
});

/**
 * 请求拦截器
 */
http.interceptors.request.use(config => {
  const userStore = useUserStore();
  const userToken = userStore.userToken;
  (userToken) && (config.header!['Authorization'] = `Bearer ${ userToken }`);

  return config;
}, config => {
  // console.log('http 请求拦截错误：', config);
  return Promise.reject(config);
});

/**
 * 响应拦截器
 */
http.interceptors.response.use(response => {
  // console.log('http 响应成功:', response);
  const resData = response.data;

  if (resData.code !== 0) {
    uni.showToast({ icon: 'none', title: `${ resData.msg || '业务出错' }` });
    return Promise.reject(resData);
  }
  uni.hideLoading();

  return resData;
}, errResponse => {
  // console.log('http 响应拦截错误:', errResponse);
  const errData = errResponse.data;
  uni.hideLoading();

  // 401 未授权
  if (errResponse.statusCode === 401) {
    const userStore = useUserStore();
    userStore.userLogoutAction();
    return Promise.reject(errData);
  }

  uni.showToast({ icon: 'none', title: `${ errData.msg || '服务器出错' }` });
  return Promise.reject(errData);
});

/**
 * 封装 http 请求
 * @param {String} url url
 * @param {Object} data 请求数据
 * @param {String} method 请求方法
 */
const httpRequest = <T = any>(url = '', data = {}, method = 'get'): Promise<IResponse<T>> => {
  return http.request({
    url,
    method: method.toUpperCase() as HttpMethod,
    [method === 'get' ? 'params' : 'data']: data
  });
};

export default httpRequest;
