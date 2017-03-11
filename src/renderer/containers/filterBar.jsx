import { connect }                  from 'react-redux'
import FilterBar                    from '../components/filterBar'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        filter: state.filter,
        fetchStatus: state.fetchStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateFilterCondition: (filter) => {
            return dispatch(Actions.updateFilterCondition(filter))
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)
