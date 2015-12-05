
// webpack.config.js
// requite a plugin to provide a series of paths to be rendered.
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
// The ExtractTextPlugin moves every require("style.css") in entry chunks into a separate css output file.
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// data is a custum configuration librery to store routes , title ...
var data = require('./data')

module.exports = {
  entry: {
      main: './entry.js', // our main javascript file
      css: './scss/app.scss' // our sass entry
    },
  output: {
    filename: 'bundle.js',
    path: './build', // build directory
    /* IMPORTANT!
     * You must compile to UMD or CommonJS
     * so it can be required in a Node context: */
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
