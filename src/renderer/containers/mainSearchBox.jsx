import { connect }                  from 'react-redux'
import MainSearchBox                from '../components/mainSearchBox'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainSearchBox)
