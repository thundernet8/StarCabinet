import { connect }                  from 'react-redux'
import MainPage                     from '../components/mainPage'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
    db: state.db
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetLocalCredentials: (callback) => {
      dispatch(Actions.getLocalCredentials(callback))
    },
    onGetRxDB: (dbName) => {
      dispatch(Actions.connectRxDB(dbName))
    }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
