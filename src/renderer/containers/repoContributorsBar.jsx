import { connect }                  from 'react-redux'
import RepoContributorsBar          from '../components/repoContributorsBar'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        selectedRepo: state.selectedRepo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchRepoContributors: (repo) => {
            return dispatch(Actions.fetchRepoContributors(repo))
        },
        onGetRepoContributors: (id) => {
            return dispatch(Actions.getSelectedRepoContributors(id))
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoContributorsBar)
