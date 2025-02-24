import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
// import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve(), 
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }), // 解析 TypeScript
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    // terser(),
    postcss({
      minimize: false, 
      extract: 'index.css',
    }),
    
  ],
  external: ['react', 'react-dom'], // 将 React 和 ReactDOM 作为外部依赖
};