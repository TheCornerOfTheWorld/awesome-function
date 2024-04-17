import type { Plugin } from "vite";
import { createFilter } from "vite";
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import type { RawSourceMap } from "source-map";
import { SourceMapConsumer } from "source-map";
import type { StringLiteral } from "@babel/types";

// git@github.com:sanxin-lin/clear-console-plugins.git
export interface IVitePerfectConsolePluginOptions {
  tip?: string;
}
const _traverse = (
  typeof traverse === "function" ? traverse : (traverse as any).default
) as typeof traverse;

const _generate = (
  typeof generate === "function" ? generate : (generate as any).default
) as typeof generate;

function stringLiteral(value: string): StringLiteral {
  return {
    type: "StringLiteral",
    value,
  };
}

function generateStrNode(str: string): StringLiteral & { skip: boolean } {
  const node = stringLiteral(str);
  // @ts-ignore
  node.skip = true;
  // @ts-ignore
  return node;
}

// 分隔字符串节点
const splitCode = generateStrNode("\n");

// 提示文件路径+行数的文本
function handleFileNameTip(filePath: string, lineNumber: number) {
  if (!filePath) return "";
  return ` -> ${filePath}:${lineNumber}`;
}

const viteConsolePromotePlugin = (
  { tip }: IVitePerfectConsolePluginOptions = { tip: "🚀 ~" }
): Plugin => {
  let root = "";
  // 检测的文件类型范围
  const filter = createFilter(
    [/\.[jt]sx?$/, /\.vue$/, /\.svelte$/, /\.astro$/],
    [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/]
  );
  // 提示行数的文本
  function generateLineOfTip(relativeFilename: string, lineNumber: number) {
    return `${relativeFilename ? "" : `line of ${lineNumber} `}${tip}`;
  }
  return {
    name: "vite-console-promote-plugin",
    // 这个钩子在vite解析完配置后调用
    configResolved(config) {
      // 获取最终的root路径
      root = config.root;
    },
    enforce: "post",
    async transform(code, id) {
      // 不属于范围内的文件，不处理
      if (!filter(id)) return;
      const rawSourcemap = this.getCombinedSourcemap();
      const consumer = await new SourceMapConsumer(
        rawSourcemap as RawSourceMap
      );

      const ast = parse(code, {
        sourceType: "unambiguous",
        sourceFilename: id,
      });

      _traverse(ast, {
        // FunctionDeclaration: function (path) {
        //   console.log("🚀 ~ FunctionDeclaration", path.node.id);
        // },
        CallExpression(path: any) {
          const calleeCode = _generate(path.node.callee).code;
          // 只处理代码是console.log的代码
          if (calleeCode === "console.log") {
            // 获取console.log函数的入参数组
            const nodeArguments = path.node.arguments;
            const { loc } = path.node;
            if (loc) {
              let startLine: any = null;
              let endLine: any = null;
              const { line: _startLine, column: _startColumn } = loc.start;
              const { line: _endLine, column: _endColumn } = loc.end;
              const { line: originStartLine } = consumer.originalPositionFor({
                line: _startLine,
                column: _startColumn,
              });
              const { line: originEndLine } = consumer.originalPositionFor({
                line: _endLine,
                column: _endColumn,
              });
              startLine = originStartLine;
              endLine = originEndLine;
              const relativeFilename = id.replace(`${root}/`, "").split("?")[0];
              const startLineTipNode = stringLiteral(
                `${generateLineOfTip(
                  relativeFilename,
                  startLine!
                )}${handleFileNameTip(relativeFilename, startLine!)}\n`
              );
              // 放到console.log参数的最前面，让他输出在顶端
              nodeArguments.unshift(startLineTipNode);
              console.log("nodeArguments", nodeArguments);
            }
          }
        },
      });
      // 使用_generate转换ast
      const { code: newCode, map } = _generate(ast, {
        sourceFileName: id,
        // 保留空行
        retainLines: true,
        // 生成sourcemap文件
        sourceMaps: true,
      });

      return {
        code: newCode,
        map,
      };
    },
  };
};
export default viteConsolePromotePlugin;
