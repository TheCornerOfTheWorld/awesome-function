// @ts-nocheck

/**
 * 1. num的每次变化都会导致scheduler的执行，并将注册好的副作用函数存入jobQueue队列，因为Set本身的去重性质，最终只会存在一个fn
 * 2. 利用Promise微任务的特性，当num被更改100次之后同步代码全部执行结束后，then回调将会被执行，此时num已经是101，而jobQueue中也只有一个fn，所以最终只会打印一次101
 */
const state = reactive({
  num: 1
})

const jobQueue = new Set()
const p = Promise.resolve()
let isFlushing = false

const flushJob = () => {
  if (isFlushing) {
    return
  }

  isFlushing = true
  // 微任务
  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    // 结束后充值设置为false
    isFlushing = false
  })
}

effect(
  () => {
    console.log('num', state.num)
  },
  {
    scheduler(fn) {
      // 每次数据发生变化都往队列中添加副作用函数
      jobQueue.add(fn)
      // 并尝试刷新job，但是一个微任务只会在事件循环中执行一次，所以哪怕num变化了100次，最后也只会执行一次副作用函数
      flushJob()
    }
  }
)

let count = 100

while (count--) {
  state.num++
}
