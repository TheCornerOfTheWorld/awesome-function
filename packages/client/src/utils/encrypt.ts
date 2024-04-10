// import AES from 'crypto-js/aes'
// import ECB from 'crypto-js/mode-ecb'
// import padPkcs7 from 'crypto-js/pad-pkcs7'
// import encUtf8 from 'crypto-js/enc-utf8'

// crypto-js 使用 https://www.jianshu.com/p/0689506403e7
// 参考 https://blog.csdn.net/qq_34707272/article/details/121857485
import CryptoJS from 'crypto-js'

// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse('1234123412341234')
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse('1234123412341234')

export function encrypt(data: string) {
  if (typeof data === 'object') {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.stringify(data)
    } catch (error) {
      console.log('encrypt error:', error)
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}

export function decrypt(data: any) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
const data = '13172'

const encryptText = encrypt(data)
console.log('加密', encryptText)

const decryptText = decrypt(encryptText)
console.log('🚀 ~ decryptText:解密', decryptText)
