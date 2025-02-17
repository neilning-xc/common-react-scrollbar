import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
// import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.ts', // 入口文件
  output: [
    {
      file: 'dist/index.js', // 输出文件
      format: 'cjs', // CommonJS 格式
      // sourcemap: true, // 生成 sourcemap
    },
    {
      file: 'dist/index.esm.js', // 输出文件 (ES 模块)
      format: 'esm', // ES 模块格式
      // sourcemap: true,
    },
  ],
  plugins: [
    // replace({
    //   'process.env.NODE_ENV': JSON.stringify('production'), // 替换环境变量
    //   preventAssignment: true,
    // }),
    resolve(), // 解析第三方模块
    commonjs(), // 将 CommonJS 模块转换为 ES 模块
    typescript({ tsconfig: './tsconfig.json' }), // 解析 TypeScript
    babel({
      exclude: 'node_modules/**', // 排除 node_modules
      babelHelpers: 'bundled', // 使用 bundled 模式
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // 支持 .ts 和 .tsx
    }),
    terser(),
    postcss({
      minimize: true, 
      extract: 'index.css',
    }),
    
  ],
  external: ['react', 'react-dom'], // 将 React 和 ReactDOM 作为外部依赖
};