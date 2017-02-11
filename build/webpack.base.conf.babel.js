var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // http://webpack.github.io/docs/configuration.html#node
  node: {
		__filename: false,
		__dirname: false
	},
  entry: {
    app: './src/renderer/index.js',
    electron: './src/main/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'app': path.resolve(__dirname, '../app'),
      'dist': path.resolve(__dirname, '../dist'),
      'src': path.resolve(__dirname, '../src')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  target: 'electron-renderer',  // important
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['transform-runtime', 'transform-decorators-legacy']
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      // {
      //   test: /\.global\.css$/,
      //   loaders: [
      //     'style-loader',
      //     'css-loader?sourceMap!postcss-loader'
      //   ]
      // },
      {
        test: /\.css$/,
        include: /styles\/global/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
      },
      // {
      //   test: /^((?!\.global).)*\.css$/,
      //   loaders: [
      //     'style-loader',
      //     'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      //   ]
      // },
      {
        test: /\.css$/,
        exclude: /styles\/global/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.scss$/,
        include: /styles\/global/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader!postcss-loader')
      },
      {
        test: /\.scss$/,
        exclude: /styles\/global/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  postcss() {
    return [
      require('postcss-import'),
      require('postcss-nested'),
      require('autoprefixer')
    ];
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    // extract css to one file
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
}
