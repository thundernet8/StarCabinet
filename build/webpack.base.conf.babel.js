var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // http://webpack.github.io/docs/configuration.html#node
  node: {
		__filename: false,
		__dirname: false
	},
  entry: {
    app: './src/renderer/index.tsx',
    electron: './src/main/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
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
      },
      {
        test: /\.css$/,
        exclude: [/global/, /node_modules/],
        loader: 'typed-css-modules'
      },
      {
        test: /\.scss$/,
        exclude: [/global/, /node_modules/],
        loader: 'typed-css-modules'
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime', 'transform-decorators-legacy']
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
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
        include: [/global/, /node_modules/],
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
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.scss$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!sass-loader')
      },
      {
        test: /\.scss$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader')
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
