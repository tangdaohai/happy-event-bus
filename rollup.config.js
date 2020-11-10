import typescript from 'rollup-plugin-typescript2'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
const banner = `/**
 * version: ${pkg.version},
 * github: ${pkg.homepage} 
 */`
export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/index.umd.js',
      format: 'umd',
      name: 'HappyEventBus',
      banner,
      // plugins: [
      //   getBabelOutputPlugin({
      //     allowAllFormats: true,
      //     presets: ['@babel/preset-env'],
      //     plugins: [['@babel/plugin-transform-runtime', { modules: 'umd' }]]
      //   })
      // ]
    },
    {
      file: './dist/index.esm.js',
      format: 'es',
      banner,
      // plugins: [
      //   getBabelOutputPlugin({
      //     presets: ['@babel/preset-env'],
      //     plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]]
      //   })
      // ]
    },
    // {
    //   file: './dist/index.esm.min.js',
    //   format: 'es',
    //   banner,
    //   plugins: [terser(
    //     {
    //       compress: {
    //         ecma: 2015,
    //         pure_getters: true
    //       }
    //     }
    //   )]
    // },
  ],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' })
  ],
}