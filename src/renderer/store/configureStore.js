if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureProdStore')
} else {
    module.exports = require('./configureDevStore')
}
