import { connect }                  from 'react-redux'
import HomePage                     from '../components/homePage'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
    credentials: state.credentials
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetLocalCredentials: () => {
      dispatch(Actions.getLocalCredentials())
    }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
