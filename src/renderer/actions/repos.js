import * as CONSTANTS                from '../constants'
import GithubClient                  from '../utils/githubClient'
import DBHandler                     from '../rxdb/dbHandler'
import Promise                       from 'bluebird'
import { updateLanguagesList }       from './languages'

export const updateReposList = () => {
    // this action only query local data, never fetch the remote server
    return (dispatch, getState) => {
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
        return dbHandler.initDB().then(() => dbHandler.getRepos(conditions))
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
            throw new Error(err)
        })
    }
}

export const fetchRemoteReposList = (isStartUp = false) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_REPOS_LIST // show refresh spin
        })

        let promise
        // when app startup it always fetch the remote server, but at this time we use local storaged data first
        if (isStartUp) {
            promise = dispatch(updateReposList())
        } else {
            promise = Promise.resolve('ok')
        }

        const state = getState()
        const client = new GithubClient(state.credentials)
        return client.getStarredRepos()
        .then(ret => ret.data)
        .then((repos) => {
            const dbHandler = new DBHandler(state.db)
            return dbHandler.initDB()
            .then(() => {
                return promise.then(() => Promise.all([dbHandler.upsertRepos(repos), dbHandler.upsertOwners(repos), dbHandler.upsertLanguages(repos), dbHandler.recordReposCount(repos.length)]))
                .then((ret) => {
                    dispatch({
                        type: CONSTANTS.FETCH_REPOS_LIST_SUCCESS,
                        increase: ret[3]
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

export const clearReposChangeNum = () => {
    return {
        type: CONSTANTS.CLEAR_INCREASE_PROP
    }
}
