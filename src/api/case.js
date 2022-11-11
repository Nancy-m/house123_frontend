/* 一般案件增删改查 */
import request from '@/utils/request';
// 案件查询列表数据
export const findCases = function(params) {
  return request({
      url: `frenchRacket/findCases`,
      method: 'get',
      showLoading: false,
      // needEncrypt: true,
      // needDecrypt: true,
      params
  });
};
// 列名列表
export const getFieldAnnotation = function(data) {
  return request({
      url: `frenchRacket/getFieldAnnotation`,
      method: 'post',
      showLoading: false,
      showError: false,
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