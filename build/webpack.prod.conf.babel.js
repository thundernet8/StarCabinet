import path from 'path'
import webpack from 'webpack'
import config from './webpack.base.conf.babel'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import _ from 'lodash'

config.output.filename = '[name].[chunkhash:8].js' // [name].[chunkhash]
config.output.chunkFilename = '[id].js' // [id].[chunkhash]

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = true

config.devtool = SOURCE_MAP ? '#source-map' : false

config.module.loaders = (config.module.loaders || []).concat({
  test: /\.jsx$/,
  loader: 'babel',
  query: {
    presets: ['react', 'es2015', 'stage-2'],
    plugins: ['transform-runtime', 'transform-decorators-legacy']
  },
  exclude: /node_modules/
})

config.output.path = path.resolve(__dirname, '../app/dist')
config.output.publicPath =  './'

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  // new ExtractTextPlugin('[name].[contenthash:8].css')
])

var electronConfig = _.cloneDeep(config)
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  // see https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: '../../app/dist/index.html',
    template: 'src/renderer/index.html',
    inject: true,
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   removeAttributeQuotes: true
    //   // more options:
    //   // https://github.com/kangax/html-minifier#options-quick-reference
    // }
    //excludeChunks: ['electron']
  })
])

delete electronConfig.entry.app
delete config.entry.electron

electronConfig.output.filename = '[name].js' // for Electron, the main entry name is fixed in package.json, hash should removed

module.exports = [config, electronConfig]
