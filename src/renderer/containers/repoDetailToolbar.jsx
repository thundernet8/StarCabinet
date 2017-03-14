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
    return {
        onStarStarCabinet: () => {
            return dispatch(Actions.starStarCabinet())
        },
        onUpdateRepoNote: (id, note) => {
            return dispatch(Actions.updateRepoNote(id, note))
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoDetailToolbar)
