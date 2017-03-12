import { connect }                  from 'react-redux'
import RepoListItem                 from '../components/repoListItem'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectRepo: (repo) => {
            dispatch(Actions.selectOneRepo(repo))
        },
        onRateRepo: (id, score) => {
            dispatch(Actions.rateOneRepo(id, score))
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoListItem)
