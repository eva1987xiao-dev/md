'use strict'

import path from 'node:path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import webpack from 'webpack'

const currentDir = import.meta.dirname

// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig */

/** @type WebpackConfig */

export default function config() {
  return {
    target: `node`,
    mode: `none`,
    entry: `./src/extension.ts`,
    output: {
      path: path.resolve(currentDir, `dist`),
      filename: `extension.js`,
      libraryTarget: `commonjs2`,
    },
    externals: {
      vscode: `commonjs vscode`,
    },
    resolve: {
      extensions: [`.ts`, `.js`],
      fallback: {
        'bufferutil': false,
        'utf-8-validate': false,
        'canvas': false,
      },
      plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(currentDir, `tsconfig.json`) })],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: `ts-loader`,
            },
          ],
        },
        {
          test: /\.(css|txt)$/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [
      // Replace isomorphic-dompurify with a simpler implementation for Node
      new webpack.NormalModuleReplacementPlugin(
        /isomorphic-dompurify/,
        path.resolve(currentDir, 'src/dompurify-mock.js'),
      ),
    ],
    devtool: `nosources-source-map`,
    infrastructureLogging: {
      level: `log`,
    },
    optimization: {
      usedExports: true,
      sideEffects: true,
    },
  }
}
