// 普通会员资料管理
import request from '@/utils/request';
// 会员账号查询列表数据
export const findUsers = function(params) {
  return request({
      url: `frenchRacketc/findUsers`,
      method: 'get',
      showLoading: false,
      headers: {userType: 'M'},
      params
  });
};
// 会员账号新增账号
export const insertUsers = function(data) {
  return request({
      url: `frenchRacketc/insertUsers`,
      method: 'post',
      showLoading: false,
      showError: false,
      headers: {userType: 'M'},
      data
  });
};

// 会员账号修改账号接口
export const updateUsers = function(data) {
  return request({
      url: `frenchRacketc/updateUsers`,
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
      url: `frenchRacketc/deleteUsersById`,
      method: 'post',
      showLoading: false,
      showError: false,
      data
  });
};
