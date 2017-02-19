import { connect }                  from 'react-redux'
import LoginPage                    from '../components/loginPage'

// Redux connection
const mapStateToProps = (state) => {
  return {
    data: state.mainReducer.data
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps)(LoginPage)
