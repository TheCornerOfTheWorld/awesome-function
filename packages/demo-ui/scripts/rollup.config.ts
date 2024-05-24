import { name } from '../package.json'
import typescript from 'rollup-plugin-typescript2'
import vuePlugin from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
// 如果依赖模块中存在 es 模块，需要使用 @rollup/plugin-node-resolve 插件进行转换
import nodeResolve from '@rollup/plugin-node-resolve'
import images from '@rollup/plugin-image' // 打包图片
import copy from 'rollup-plugin-copy'

const file = (type: string) => `dist/${name}.${type}.js`

module.exports = {
  // 这里将 file 方法 和 name 导出
  file,
  name
}

const overrides = {
  compilerOptions: { declaration: true }, // 是否创建 typescript 声明文件
  exclude: [
    // 排除项
    'node_modules',
    'src/App.vue',
    'src/main.ts'
  ]
}

module.exports = {
  input: './packages/index.ts',
  output: [
    { file: `dist/${name}.common.cjs`, format: 'cjs' },
    { file: `dist/${name}.common.mjs`, format: 'es' }
  ],
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: overrides }),
    vuePlugin(),
    postcss({
      plugins: [autoprefixer()],
      extract: 'bundle.css'
    }),
    images({ include: ['**/*.png', '**/*.jpg', '**/*.svg'] }),
    copy({
      targets: [
        {
          src: 'packages/assets/*',
          dest: 'dist/assets'
        }
      ]
    })
  ],
  external: ['vue'] // 依赖模块
}
