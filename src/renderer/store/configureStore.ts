let configureStore = (): any => {

}

if (process.env.NODE_ENV === 'production') {
    configureStore = require('./configureProdStore')
} else {
    configureStore = require('./configureDevStore')
}

export default configureStore
