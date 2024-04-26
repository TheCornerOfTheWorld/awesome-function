# 介绍

其实他们的原理整体上都是一致的，分为三步：

第一步：将代码转换成抽象语法树

第二步：使用 babel 为我们提供的方法，对语法树进行增删改查

第三步：将处理后的语法树重新转换成代码

> 注意点：在第二步中，babel 会对抽象语法树进行深度遍历，遍历到目标节点后，又会重新回到上层节点去重新遍历下一个目标节点，所以一个节点会被遍历两次，一来一回 进去是 enter 回去是 exit

# babel 插件开发

```js
export default function ({ template: template, types: t }) {
  return {
    visitor: {
      Program: {
        exit: function (path) {},
      },
      BinaryExpression: {
        exit: function (path) {},
      },
    },
  };
}
```

template： 是@babel/template 的一个方法，他能使用模板的方式生成 AST 节点

babel：插件的入参，可以从中拿到 types 对象，操作 AST 节点，由于 types 对象太常用了，babel 大部分情况下写做 {types:t}。

vistor： 你可以理解为修改 AST 节点的入口

Program、BinaryExpression： 你需要修改的 AST 节点类型

exit： 就是刚刚说的 一来一回 中的，回

path： 就是被遍历到的 AST 节点对象

https://astexplorer.net/

# AST 语法树

代码最外层的节点类型为 Program

像 0.1+0.2 这种表达式，节点类型为 BinaryExpression

BinaryExpression 节点里会有几个重要的东西

operaor：运算符号

left：左边的数字

right：右边的数字

- 抽象语法树的节点类型

标识符（Identifier）：表示变量、函数名等标识符的节点

字面量（Literal）：表示字面量值，如字符串、数字、布尔值等

表达式语句（ExpressionStatement）：表示包含表达式的语句节点

赋值表达式（AssignmentExpression）：表示赋值操作的表达式节点，如 x = 5

二元表达式（BinaryExpression）：表示包含二元操作符的表达式节点，如 x + y

一元表达式（UnaryExpression）：表示包含一元操作符的表达式节点，如 -x

函数声明（FunctionDeclaration）：表示函数声明的节点，包括函数名、参数和函数体

变量声明（VariableDeclaration）：表示变量声明的节点，包含变量名和可选的初始值

条件语句（IfStatement）：表示 If 条件语句的节点，包括条件表达式、if 分支和可选的 else 分支

循环语句（WhileStatement、ForStatement）：表示循环语句的节点，分别代表 While 循环和 For 循环

对象字面量（ObjectLiteral）：表示对象字面量的节点，包含对象属性和属性值

数组字面量（ArrayLiteral）：表示数组字面量的节点，包含数组元素

函数调用（CallExpression）：表示函数调用的节点，包含调用的函数名和参数列表

返回语句（ReturnStatement）：表示返回语句的节点，包含返回的表达式
