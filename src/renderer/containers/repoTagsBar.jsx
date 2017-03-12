import { connect }                  from 'react-redux'
import RepoTagsBar                  from '../components/repoTagsBar'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        selectedRepo: state.selectedRepo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTagForRepo: (id, tagName) => {
            return dispatch(Actions.addTagForRepo(id, tagName))
        },
        onRemoveTagForRepo: (id, tagName) => {
            return dispatch(Actions.removeTagForRepo(id, tagName))
        },
        onGetTagsForRepo: (tagIds) => {
            return dispatch(Actions.getSelectedRepoTags(tagIds))
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoTagsBar)
