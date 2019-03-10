module.exports = {
  module: {
    rules: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
        options: {
          presets: ['@babel/react', ['@babel/env', {
            targets: {
              browsers: ['last 2 versions']
            }
          }]],
          'plugins': [
            ['@babel/plugin-proposal-decorators', {'legacy': true}],
            ['@babel/plugin-proposal-class-properties', {'loose': true}],
            '@babel/plugin-proposal-optional-chaining'
          ]
        }
      }
    ]
  },
  devtool: 'source-map',
}
