import myExample from "../src/plugins/rollup-plugin-my-example";

import vuePlugin from "rollup-plugin-vue";
// import typescript from "rollup-plugin-typescript";
import typescript2 from "rollup-plugin-typescript2";
// import esbuild from "rollup-plugin-esbuild"

const overrides = {
  compilerOptions: { declaration: true }, // 是否创建 typescript 声明文件
  exclude: [
    // 排除项
    "node_modules",
  ],
};

export default [
  {
    input: ["src/compPlugin.ts"],
    plugins: [
      vuePlugin(),
      typescript2({
        tsconfigOverride: overrides,
      }),

      // typescript({
      //   tsconfig: false,
      //   experimentalDecorators: true,
      //   module: "es2015",
      // }),

      // esbuild({
      //   include: /\.[jt]s$/,
      //   minify: process.env.NODE_ENV === "production",
      //   target: "es2015",
      // }),
    ],
    output: [
      { file: "dist/compPlugin.cjs.js", format: "cjs" },
      { file: "dist/compPlugin.esm.js", format: "esm" },
    ],
  },
  {
    input: "src/plugins/rollup-plugin-my-example.js",
    plugins: [myExample()],
    output: [
      {
        file: "dist/rollup-plugin-example.js",
        format: "cjs",
      },
    ],
  },
];
