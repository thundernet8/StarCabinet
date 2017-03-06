import { connect }                  from 'react-redux'
import MainPage                     from '../components/mainPage'
import Actions                      from '../actions'

// Redux connection
const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        profile: state.profile,
        db: state.db,
        search: state.search,
        order: state.order,
        filter: state.filter,
        category: state.category,
        repos: state.repos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetLocalCredentials: () => {
            return dispatch(Actions.getLocalCredentials())
        },
        onGetRxDB: (dbName) => {
            return dispatch(Actions.connectRxDB(dbName))
        },
        onNeedUpdateReposList: () => {
            return dispatch(Actions.updateReposList())
        },
        onGetMyProfile: () => {
            return dispatch(Actions.getMyProfile())
        },
        onFetchStarredRepos: () => {
            return dispatch(Actions.fetchRemoteReposList())
        }
    }
}

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
