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
    onGetLocalCredentials: () => {
      return dispatch(Actions.getLocalCredentials())
    },
    onGetRxDB: (dbName) => {
      return dispatch(Actions.connectRxDB(dbName))
    }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
