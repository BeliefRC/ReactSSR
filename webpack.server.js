const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base')

const nodeExternals = require('webpack-node-externals')
const serverConfig = {
  //不打包node的相关代码（path，fs等）
  target: 'node',
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [nodeExternals()]
}

module.exports = merge(config, serverConfig)
