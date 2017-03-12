import { connect }                  from 'react-redux'
import RepoDetail                   from '../components/repoDetail'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        selectedRepo: state.selectedRepo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoDetail)
