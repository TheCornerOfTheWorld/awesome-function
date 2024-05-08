// 防抖装饰器
function debounce(time) {
  return function (target, key, descriptor) {
    const oldFunction = descriptor.value
    let timer = null
    descriptor.value = function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        oldFunction.apply(this, arguments)
      }, time)
    }
    return descriptor
  }
}

// 节流装饰器
function throttle(time) {
  return function (target, key, descriptor) {
    const oldFunction = descriptor.value
    let isLock = false
    descriptor.value = function () {
      if (isLock) {
        return
      }
      isLock = true
      oldFunction.apply(this, arguments)
      setTimeout(() => {
        isLock = false
      }, time)
    }
    return descriptor
  }
}

class C {
  @debounce(1000)
  onClick() {}

  @throttle(1000)
  onScroll() {}
}
