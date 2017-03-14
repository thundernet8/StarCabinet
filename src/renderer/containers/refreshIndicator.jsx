import { connect }                  from 'react-redux'
import RefreshIndicator             from '../components/refreshIndicator'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        fetchStatus: state.fetchStatus,
        offline: state.offline.value,
        increase: state.increase
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRefresh: () => {
            return dispatch(Actions.fetchRemoteReposList())
        },
        onClearIncreaseProp: () => {
            dispatch(Actions.clearReposChangeNum())
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RefreshIndicator)
