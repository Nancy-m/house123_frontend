
import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// // import store from '@/store'
// // import { getToken } from '@/utils/authCookies'
// // import { getTokenStorage, setTokenStorage } from '@/utils/authLocalStorage'
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '//修改为自己的线上地址' : '/api',
  timeout: 5000 // request timeout
})


service.interceptors.request.use(
  config => {
    config.headers.userType = 'M';  //请求头加上token
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject();
    }
  },
  error => {
    return Promise.reject(error.response);
  }
);


export default service;
