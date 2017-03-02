import { connect }                  from 'react-redux'
import MainDetailPane               from '../components/mainDetailPane'
import Actions                      from '../actions' 

// Redux connection
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainDetailPane)
