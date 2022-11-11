/* 登录 */
import request from '@/utils/request';
// 会员账号查询列表数据
export const findUsers = function(params) {
  return request({
      url: `frenchRacket/findUsers`,
      method: 'get',
      showLoading: false,
      // needEncrypt: true,
      // needDecrypt: true,
      params
  });
};


//登录接口（含token）
// 入参：private String password;
// private String email;
// private String userType;//客户端登录传U,管理端传M
export const login = function(data) {
  return request({
      url: `frenchRacketLogin/login`,
      method: 'post',
      showLoading: false,
      showError: false,
      headers: {userType: 'M'},
      data
  });
};

// 会员账号修改账号接口
export const updateManagers = function(data) {
  return request({
      url: `frenchRacket/updateManagers`,
      method: 'post',
      showLoading: false,
      showError: false,
      data
  });
};
// 管理员账号删除接口
