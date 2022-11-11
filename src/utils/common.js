// 下载流文件
export const exportFile = function(response) {
    console.log('download---', response);
    const res = response.data || {};
    const type = response.headers['content-type'];
    const fileName = decodeURI((response.headers['content-disposition'] || '').split('filename=')[1] || '');
    const blob = new Blob([res], {type});
    const url = URL.createObjectURL(blob);

    // 获取heads中的filename文件名
    const downloadElement = document.createElement('a');
    // 创建下载的链接
    document.body.appendChild(downloadElement);
    downloadElement.download = decodeURI(fileName || '');
    downloadElement.href = url;
    // 点击下载
    downloadElement.click();
    // 下载完成移除元素
    document.body.removeChild(downloadElement);
};

// 打开文件地址
export function downLoadUrl(url) {
    window.open(url);
}

/**
 * 本地缓存方法调用优化
 * @param {*} type
 * @returns
 */
export const useStorage = function(type = 'sessionStorage') {
    const storageMap = new Map([['sessionStorage', sessionStorage], ['localStorage', localStorage]]);
    let storage = storageMap.get(type);
    if (!storage) throw new Error('Please provide the matching key for storage');
    // 访问本地storage
    const getItem = function(key, toJSON, _type) {
        if (!key) throw new Error('Please provide the key for storage');
        if (_type) {
            storage = storageMap.get(_type);
        }
        const value = storage.getItem(key);
        if (toJSON && !value) {
            return value;
        }
        return toJSON ? JSON.parse(value) : value;
    };
    // 设置本地storage
    const setItem = function(key, value, toJSON, _type) {
        if (!key) throw new Error('Please provide the key for storage');
        if (value === null || value === undefined) {
            throw new Error("the value can't be null or undefined");
        }
        if (_type) {
            storage = storageMap.get(_type);
        }
        storage.setItem(key, toJSON ? JSON.stringify(value) : value);
    };
    return {
        getItem,
        setItem
    };
};
// 生产UUID
export function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function noPassByMobile(str) {
    if (!str) {
        return '';
    }
    var pat = /(\d{3})\d*(\d{4})/;
    return str.replace(pat, '$1****$2');
}

// 数字千分位
export function toThousands(num) {
    num = (num || 0).toString();
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

// 脱敏用户敏感信息
export function hideUserInfo(value, type){
  if (!value) return value;
  try {
    switch (type) {
      case 'name':
        if (value.length <= 2) {
          return `${value.slice(0, 1)}*`;
          // return value.replace(/^(.).+$/, '$1*');
        } else {
          return value.replace(/^(.).+(.)$/, '$1*$2');
        }
      case 'idCard':
        return value.replace(/^(.{3})(?:\d+)(.{3})$/, "$1********$2");
      case 'phone':
        return value.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
      case 'email':
        return value.substr(0, 2) + '****' + value.substr(value.indexOf('@'));
      default:
        return value;
    }
  } catch (e) {
    return value;
  }
}
