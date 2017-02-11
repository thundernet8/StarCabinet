var hotClient = require('webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&noInfo=true&reload=true') // change the path if you modified the port or domain in  webpack.dev.conf.js(line 29)

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
