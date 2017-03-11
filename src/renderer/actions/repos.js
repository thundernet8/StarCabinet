import * as CONSTANTS                from '../constants'
import GithubClient                  from '../utils/githubClient'
import DBHandler                     from '../rxdb/dbHandler'
import Promise                       from 'bluebird'
import { updateLanguagesList }       from './languages'

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
        dispatch({
            type: CONSTANTS.QUERY_REPOS_LIST
        })

        const state = getState()
        const conditions = {
            group: state.group,
            search: state.search,
            order: state.order,
            filter: state.filter
        }

        const dbHandler = new DBHandler(getState().db)
        dbHandler.initDB().then(() => dbHandler.getRepos(conditions))
        .then((repos) => {
            dispatch({
                type: CONSTANTS.QUERY_REPOS_LIST_SUCCESS,
                repos
            })
            return repos
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.QUERY_REPOS_LIST_FAIL,
                err
            })
            return err
        })
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
            const dbHandler = new DBHandler(state.db)
            return dbHandler.initDB()
            .then(() => {
                return Promise.all([dbHandler.upsertRepos(repos), dbHandler.upsertLanguages(repos)])
                .then((ret) => {
                    dispatch({
                        type: CONSTANTS.FETCH_REPOS_LIST_SUCCESS
                    })

                    // update languages state meanwhile
                    dispatch(updateLanguagesList())
                    // update repos state meanwhile
                    dispatch(updateReposList())

                    return repos
                })
                .catch((err) => {
                    console.error(err)
                    dispatch({
                        type: CONSTANTS.FETCH_REPOS_LIST_FAIL,
                        err
                    })
                    return err
                })
            })
            .catch((err) => {
                console.error(err)
                return err
            })
        })
        .catch((err) => {
            console.error(err)
            dispatch({
                type: CONSTANTS.FETCH_REPOS_LIST_FAIL
            })

            // now update the repos list from indexed db
            dispatch(updateReposList())

            return err
        })
    }
}
