// 日志装饰器函数
function logDecorator(target, key, descriptor) {
  const originalMethod = descriptor.value // 保存原始方法

  descriptor.value = function (...args) {
    console.log(`调用函数：${key}`)
    console.log(`参数：${JSON.stringify(args)}`)

    // 执行原始方法
    const result = originalMethod.apply(this, args)

    console.log(`返回值：${result}`)

    return result
  }

  return descriptor
}

// 示例类
class Example {
  @logDecorator
  greet(name) {
    return `Hello, ${name}!`
  }
}

// 测试
const example = new Example()
example.greet('林三心')
