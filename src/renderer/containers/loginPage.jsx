import { connect }                  from 'react-redux'
import LoginPage                    from '../components/loginPage'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetLocalCredentials: () => {
      dispatch(Actions.getLocalCredentials())
    },
    onClearUsername: () => {
      dispatch(Actions.clearLoginUsername())
    },
    onClearPassword: () => {
      dispatch(Actions.clearLoginPassword())
    },
    onChangeUsername: (event) => {
      dispatch(Actions.changeLoginUsername(event.target.value))
    },
    onChangePassword: (event) => {
      dispatch(Actions.changeLoginPassword(event.target.value))
    }
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
