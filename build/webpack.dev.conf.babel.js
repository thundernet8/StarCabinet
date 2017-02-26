import path               from 'path'
import webpack            from 'webpack'
import baseConfig         from './webpack.base.conf.babel'
import merge              from 'webpack-merge'
import HtmlWebpackPlugin  from 'html-webpack-plugin'

const port = process.env.PORT || 3000

let devConfig = {
  // eval-source-map is faster for development
  devtool: '#eval-source-map',

  entry: {
    app: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
      'babel-polyfill',
      './src/renderer/index.jsx'
    ],
    electron: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
      'babel-polyfill',
      './src/main/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: `http://localhost:${port}/static/`
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-2']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: 'src/renderer/index.html',
      inject: true,
      excludeChunks: ['electron']
    })
  ]
}

export default merge(baseConfig, devConfig)
