import { connect }                  from 'react-redux'
import LoginPage                    from '../components/loginPage'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
    credentials: state.credentials,
    loginResult: state.loginResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetLocalCredentials: () => {
      dispatch(Actions.getLocalCredentials())
    },
    onRequestLogin: (credentials) => {
      dispatch(Actions.requestLogin(credentials))
    }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
