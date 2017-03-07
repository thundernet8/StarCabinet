import { connect }                  from 'react-redux'
import MainGroupTopIndicator        from '../components/mainGroupTopIndicator'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        fetchStatus: state.fetchStatus,
        offline: state.offline.value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: () => {
            return dispatch(Actions.fetchRemoteReposList())
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainGroupTopIndicator)
