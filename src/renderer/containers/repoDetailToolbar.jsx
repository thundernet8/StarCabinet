import { connect }                  from 'react-redux'
import RepoDetailToolbar            from '../components/repoDetailToolbar'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        selectedRepo: state.selectedRepo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoDetailToolbar)
