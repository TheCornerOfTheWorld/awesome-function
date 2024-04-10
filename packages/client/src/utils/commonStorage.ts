import packages from 'package.json'

/**
 * - 项目+环境+版本号+key
 * - expire，localStorage [name: {value: xxx, time:new Date.now(), expire: 5000}]
 * - crypto-js 进行对数据的加密，使用这个库里的 encrypt、decrypyt 进行加密、解密
 */
// key
const prefix: string = `${packages.name}-${process.env}-${packages.version}`

// expire
type Timeliness = {
  value: string
  time: Date
  expire: 5000
}
// 加密

class CommonLocalStorage {
  private storage: Storage
  constructor() {
    this.storage = window.localStorage
  }
  set(key: string, value: any) {
    // 执行监听操作
    return this.storage.setItem(`${prefix}${key}`, value)
  }
  get(key: string) {
    return this.storage.getItem(`${prefix}${key}`)
  }
  del(key: string) {
    return this.storage.removeItem(`${prefix}${key}`)
  }
  clear() {
    this.storage.clear()
  }
}

const commonStorage = new CommonLocalStorage()

export default commonStorage
