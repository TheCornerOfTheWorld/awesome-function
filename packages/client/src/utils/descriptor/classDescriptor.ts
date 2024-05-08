interface MyClass {
  log: (msg: any) => void
  myName: string
}

function addConsole(target: any) {
  target.myName = '一个类'
  target.prototype.log = function (msg: any) {
    console.log(`${new Date()}`, msg)
  }
}

@addConsole
class MyClass {
  constructor() {}
}

const myObj = new MyClass()
myObj.log('林三心')
// [Sat Jul 08 2023 17:31:55 GMT+0800 (中国标准时间) 林三心
console.log(MyClass.myName)
// 一个类
