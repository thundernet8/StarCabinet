import express                  from 'express'
import webpack                  from 'webpack'
import devConfig                from './webpack.dev.conf.babel'
import webpackDevMiddleware     from 'webpack-dev-middleware';
import webpackHotMiddleware     from 'webpack-hot-middleware';
import { spawn }                from 'child_process';

let app = express()
let compiler = webpack(devConfig)
const PORT = process.env.PORT || 3000

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  stats: {
    colors: true
    // chunks: false
  }
})

let hotMiddleware = webpackHotMiddleware(compiler)

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
// serve webpack bundle output
app.use(devMiddleware)
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
// serve pure static assets
app.use('/static', express.static('./static'))

const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    return console.error(err)
  }
  console.log('Listening at http://localhost:' + PORT)
})

process.on('SIGTERM', () => {
  console.log('Stopping dev server')
  devMiddleware.close()
  server.close(() => {
    process.exit(0)
  })
})
