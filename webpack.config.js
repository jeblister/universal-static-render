
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var data = require('./data')

module.exports = {
  entry: {
      main: './entry.js',
      css: './scss/app.scss'
    },
  output: {
    filename: 'bundle.js',
    path: './build',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel' },
      { test: /\.css$/, loaders: [ 'css' ] },
      {
    test: /\.scss/,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract(
      'style-loader',
      '!css-loader!sass-loader'
    )
  }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data),
    new ExtractTextPlugin('style.css')
  ],
  watch: true
}
