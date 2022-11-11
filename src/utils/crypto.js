import request from './request';
import {JSEncrypt} from 'jsencrypt';
const CryptoJS = require('crypto-js'); // 引用AES源码js

export const crypto = {
    /**
     * 获取RSA公钥
     */
    getPublic: () => {
        return new Promise((resolve, reject) => {
            request({
                url: `/api/system/open/rsaKey`,
                method: 'get'
            }).then(keyRes => {
                if (keyRes.code === 200) {
                    resolve(keyRes.result);
                } else {
                    reject(new Error('获取公钥失败'));
                }
            });
        });
    },

    /**
   * 生产随机字符串
   * @param min
   * @param max
   * @returns {string}
   */
    generateRandomCode: (min = 16, max = 16) => {
        const charset = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const range = Math.round(Math.random() * (max - min)) + min;
        let randomCode = '';
        for (let i = 0; i < range; i++) {
            randomCode += charset[Math.round(Math.random() * (charset.length - 1))];
        }
        return randomCode;
    },

    /**
   * RSA 加密
   * @param plainText
   * @param key
   */
    encryptByRSA: (plainText, key) => {
        const encrypt = new JSEncrypt(); // 实例化加密对象
        encrypt.setPublicKey(key); // 设置公钥
        return encrypt.encrypt(plainText); // 加密返回
    },

    /**
   * AES 加密
   * @param plainText
   * @param random
   * @param iv
   * @returns {string}
   */
    encryptByAES: (plainText, random, iv) => {
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), CryptoJS.enc.Utf8.parse(random), {iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return encrypted.ciphertext.toString();
    },

    /**
   * AES 解密
   * @param cipherText
   * @param random
   * @param iv
   * @returns {string}
   */
    decryptByAES: function(cipherText, random, iv) {
        const decrypt = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(cipherText)), CryptoJS.enc.Utf8.parse(random), {iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    /**
     * RSA 解密
     * @param plainText
     * @param key
     */
    decryptByRSA: (plainText, key) => {
        const decrypt = new JSEncrypt(); // 实例化加密对象
        decrypt.setPrivateKey(
            '-----BEGIN PRIVATE KEY-----' + key + '-----END PRIVATE KEY-----'
        ); // 设置公钥
        return decrypt.decrypt(plainText); // 加密返回
    }

};

/**
   * 参数加解密
   */
export async function requestEncrypt(config = {}) {
    // 参数加密
    const {needEncrypt = false, needDecrypt = false, method, data, params} = config;
    // 参数是否需要加密
    if (needEncrypt || needDecrypt) {
        let KeyCode = '';
        // 获取公钥
        try {
            KeyCode = await crypto.getPublic();
        } catch (e) {
            return this.$message.error('加密失败，请重试');
        }

        // 取出需要加密的参数
        let requestParams = {};
        if (method.toLocaleLowerCase() === 'get') {
            requestParams = params;
        } else {
            requestParams = data;
        }

        // 生成随机aeskey，不通过数据传输
        const AESKEY = crypto.generateRandomCode();
        // 生成随机IV
        const IV = crypto.generateRandomCode();

        const stringifyParams = JSON.stringify(requestParams);
        const rsa_data = {
            // iv使用RSA公钥加密
            key: crypto.encryptByRSA(`${AESKEY}-${IV}`, KeyCode),
            // 数据使用随机aeskey加密
            data: needEncrypt ? crypto.encryptByAES(stringifyParams, AESKEY, IV) : stringifyParams
        };
        // 回设加密后的参数
        if (method.toLocaleLowerCase() === 'get') {
            config.params = rsa_data;
        } else {
            config.data = rsa_data;
        }
        // 对当前接口存下偏移量
        Object.assign(config, {
            AESKEY,
            IV
        });
    }
    return config;
}

/**
 * 结果解密
 */
export async function responseDecrypt(response = {}) {
    const res = response.data || {};
    // 判断是否需要解密
    const {responseType = ''} = response.config || {};
    if (responseType.toLocaleLowerCase() === 'blob') {
        return transfromBlob(response);
    }
    const {needDecrypt = false, AESKEY, IV} = response.config;
    if (needDecrypt) {
        const {result = ''} = res || {};
        // 使用之前生成的随机aeskey进行解密
        const decStr = JSON.parse(crypto.decryptByAES(result, AESKEY, IV));
        console.log('解密结果', JSON.stringify(decStr, null, 4));
        // 将解密得值放回结果体
        Object.assign(res, {
            result: decStr
        });
    }
    return res;
}
// 对二进制流做改造
function transfromBlob(response) {
    const res = response.data || {};
    const type = response.headers['content-type'];
    const fileName = (response.headers['content-disposition'] || '').split('filename=')[1];
    const blob = new Blob([res], {type});
    return {
        code: 200,
        result: {
            url: URL.createObjectURL(blob),
            fileName: decodeURI(fileName || '')
        },
        msg: ''
    };
}
