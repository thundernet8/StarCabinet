module.exports = {
  plugins: [
    require('postcss-smart-import')({ /* ...options */ }),
    require('postcss-cssnext')({browsers: ['last 2 versions', '> 5%']}), // include 'autoprefixer' already
    require('precss')({ /* ...options */ })
  ]
}
