const DECIMAL_FUN_NAME = "Decimal";
const OPERATIONS_MAP = {
  "+": "add",
  "-": "sub",
  "*": "mul",
  "/": "div",
};
const OPERATIONS = Object.keys(OPERATIONS_MAP);

export default function ({ template: template }) {
  const preOperationAST = template(
    `new ${DECIMAL_FUN_NAME}(LEFT).OPERATION(RIGHT).toNumber()`
  ); //将0.1+0.2转化为addCalc的模板
  const requireAST = template(
    `const ${DECIMAL_FUN_NAME}=require('decimal.js')`
  ); //引入相应函数的模板

  return {
    visitor: {
      Program: {
        exit: function (path) {
          path.unshiftContainer("body", requireAST());
        },
      },
      BinaryExpression: {
        exit: function (path) {
          const operator = path.node.operator;
          if (OPERATIONS.includes(operator)) {
            path.replaceWith(
              preOperationAST({
                LEFT: path.node.left,
                RIGHT: path.node.right,
                OPERATION: OPERATIONS_MAP[operator],
              })
            );
          }
        },
      },
    },
  };
}
