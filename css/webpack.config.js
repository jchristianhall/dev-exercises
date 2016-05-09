var webpack               = require('webpack')
var ExtractTextPlugin     = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin     = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var autoprefixer          = require('autoprefixer');
var precss                = require('precss');
var postcssInlineSvg      = require('postcss-inline-svg');

module.exports = {
  entry: './src/assets/scripts/script.js',
  output: {
    path       : './build/',
    publicPath : 'http://localhost:8080/',
    filename   : 'bundle.js'
  },
  devServer: {
    port        : 8080,
    contentBase : './build',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
      {
        test    : /\.(png|jpg)$/,
        exclude : /src\/assets\/static/,
        loader  : 'url?limit=8192'
      }
    ]
  },
  postcss: function () {
    return [
      autoprefixer({ browsers: ['last 2 versions', 'ie > 7'] }),
      precss(),
      postcssInlineSvg()
    ];
  },
  resolve: {
    extensions         : ['', '.js', '.css'],
    modulesDirectories : ['src', 'assets', 'node_modules'],
    root               : __dirname
  },
  plugins: [
    new ExtractTextPlugin('app.bundle-[chunkhash].css', { allChunks: true }),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
  ]
};