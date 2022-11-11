import request from '@/utils/request';
// 管理员账号查询列表数据
export const findManagers = function(params) {
  return request({
      url: `frenchRacket/findManagers`,
      method: 'get',
      showLoading: false,
      headers: {userType: 'M'},
      // needEncrypt: true,
      // needDecrypt: true,
      params
  });
};
// 管理员账号新增账号
export const insertManagers = function(data) {
  return request({
      url: `frenchRacket/insertManagers`,
      method: 'post',
      showLoading: false,
      showError: false,
      headers: {userType: 'M'},
      data
  });
};

// 管理员账号修改账号接口
export const updateManagers = function(data) {
  return request({
      url: `frenchRacket/updateManagers`,
      method: 'post',
      showLoading: false,
      showError: false,
      headers: {userType: 'M'},
      data
  });
};
// 管理员账号删除接口
export const deleteManagers = function(data) {
  return request({
      url: `frenchRacket/deleteManagersById`,
      method: 'post',
      showLoading: false,
      showError: false,
      data
  });
};
