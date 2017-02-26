import path               from 'path'
import ExtractTextPlugin  from 'extract-text-webpack-plugin'

export default {
  // http://webpack.github.io/docs/configuration.html#node
  node: {
		__filename: false,
		__dirname: false
	},
  entry: {
    app: './src/renderer/index.jsx',
    electron: './src/main/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      path.join(__dirname, '../node_modules')
    ],
    alias: {
      'app': path.resolve(__dirname, '../app'),
      'dist': path.resolve(__dirname, '../dist'),
      'src': path.resolve(__dirname, '../src')
    }
  },
  target: 'electron-renderer',  // important
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=stage-2',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader'})
      },
      {
        test: /\.css$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'})
      },
      {
        test: /\.less$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader!less-loader'})
      },
      {
        test: /\.less$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less-loader'})
      },
      {
        test: /\.scss$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader!sass-loader'})
      },
      {
        test: /\.scss$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'})
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/images/[name].[ext]' // 'assets/images/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)/, // if /\.(woff|woff2|eot|ttf|svg)$/ the font-awesome with url like xx.woff?v=4.7.0 can not be loaded
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  plugins: [
    // extract css to one file
    new ExtractTextPlugin({filename: process.env.NODE_ENV === 'production' ? 'style.min.css' : 'style.css', disable: false, allChunks: true}),
  ]
}
