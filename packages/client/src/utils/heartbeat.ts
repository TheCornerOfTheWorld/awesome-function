import { isFunction } from 'lodash'

const cache: Record<string, any> = {}
const funcMap: Record<string, Function> = {}

let timeout: NodeJS.Timeout

function sendHeartbeat() {
  console.log('客户端定时发送心跳')
  for (const key in funcMap) {
    const fn = funcMap[key]
    if (isFunction(fn)) {
      const result = fn()
      if (result) {
        cache[key] = result
        cache['lastUpdateTime'] = Date.now()
      }
    }
  }
  ;() => {}
  timeout = setTimeout(sendHeartbeat, 3000)
}

export function addFunc(fn: Function) {
  funcMap.push(fn)
}
export function close() {
  clearTimeout(timeout)
}

export function run() {
  sendHeartbeat()
}
