var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './lib/index.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: ''
  },
  resolve: {
    root: path.join(__dirname, 'lib')
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEVTOOLS__': false
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Redux React Router Async Example',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets/images/favicon.ico')
    })
  ],
  module: {
    loaders: [
      { test: /\.png$/, loader: 'file' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },/*  'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'  */
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'lib') },

      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  cssnext: {
    browsers: 'last 2 versions'
  }
}
