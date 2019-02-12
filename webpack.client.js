const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const clientConfig = {
  //不打包node的相关代码（path，fs等）
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = merge(config, clientConfig)
