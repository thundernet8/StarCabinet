import { connect }                  from 'react-redux'
import RepoClassifyTool             from '../components/repoClassifyTool'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetCategoriesForRepo: (id) => {
            return dispatch(Actions.getSelectedRepoCategories(id))
        },
        onUpdateRepoCategories: (id, catIds) => {
            return dispatch(Actions.updateRepoCategories(id, catIds))
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoClassifyTool)
