import * as CONSTANTS                from '../constants'
import GithubClient                  from '../utils/githubClient'
import DBHandler                     from '../rxdb/dbHandler'

export const updateReposList = () => {
    return (dispatch, getState) => {
        // TODO get search/order/filter/category to filter repos

        // dispatch({
        //     type: CONSTANTS.UPDATE_REPOS_LIST_SUCCESS,
        //     repos
        // })
        // dispatch({
        //     type: CONSTANTS.UPDATE_REPOS_LIST_FAIL
        // })
    }
}

export const fetchRemoteReposList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_REPOS_LIST // show refresh spin
        })

        const state = getState()
        const client = new GithubClient(state.credentials)
        return client.getStarredRepos()
        .then(ret => ret.data)
        .then((repos) => {
            console.dir(repos)
            const dbHandler = new DBHandler(state.db)
            return dbHandler.initDB()
            .then(() => {
                return dbHandler.upsertRepos(repos)
                .then((docs) => {
                    dispatch({
                        type: CONSTANTS.FETCH_REPOS_LIST_SUCCESS
                    })
                    return repos
                })
                .catch((err) => {
                    console.dir(err)
                    dispatch({
                        type: CONSTANTS.FETCH_REPOS_LIST_FAIL
                    })
                    return err
                })
            })
            .catch((err) => {
                console.dir(err)
                return err
            })
        })
        .catch((err) => {
            console.dir(err)
            dispatch({
                type: CONSTANTS.FETCH_REPOS_LIST_FAIL
            })
            return err
        })
    }
}
