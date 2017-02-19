import { connect }                  from 'react-redux'
import HomePage                     from '../components/homePage'

// Redux connection
const mapStateToProps = (state) => {
  return {
    data: state.mainReducer.data
  }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps)(HomePage)
