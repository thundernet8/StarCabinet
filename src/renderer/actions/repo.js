import * as CONSTANTS                from '../constants'
import DBHandler                     from '../rxdb/dbHandler'
import GithubClient                  from '../utils/githubClient'
import { replaceReposListItem }      from './repos'

export const selectOneRepo = (repo) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.SELECT_ONE_REPO,
            repo
        })
    }
}

export const rateOneRepo = (id, score) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.RATE_ONE_REPO,
            id,
            score
        })

        const updateObj = {
            id,
            score
        }
        const dbHandler = new DBHandler(getState().db)
        return dbHandler.initDB().then(() => dbHandler.updateRepo(updateObj))
        .then((repo) => {
            dispatch({
                type: CONSTANTS.RATE_ONE_REPO_SUCCESS,
                repo
            })

            // also replace the repo in repos list
            dispatch(replaceReposListItem(repo))

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.RATE_ONE_REPO_FAIL,
                err
            })

            return err
        })
    }
}

export const starStarCabinet = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.STAR_STARCABINET
        })

        const state = getState()
        const client = new GithubClient(state.credentials)
        return client.starStarCabinet()
        .then((ret) => {
            console.log(ret)
            dispatch({
                type: CONSTANTS.STAR_STARCABINET_SUCCESS
            })
            return ret
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: CONSTANTS.STAR_STARCABINET_FAIL
            })
            throw err
        })
    }
}

export const addTagForRepo = (id, tagName) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.ADD_TAG_FOR_REPO
        })

        const dbHandler = new DBHandler(getState().db)
        return dbHandler.initDB().then(() => dbHandler.addRepoTag(id, tagName))
        .then((repo) => {
            dispatch({
                type: CONSTANTS.ADD_TAG_FOR_REPO_SUCCESS,
                repo
            })

            // also replace the repo in repos list
            dispatch(replaceReposListItem(repo))

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.ADD_TAG_FOR_REPO_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}

export const removeTagForRepo = (id, tagName) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.REMOVE_TAG_FOR_REPO
        })

        const dbHandler = new DBHandler(getState().db)
        return dbHandler.initDB().then(() => dbHandler.removeRepoTag(id, tagName))
        .then((repo) => {
            dispatch({
                type: CONSTANTS.REMOVE_TAG_FOR_REPO_SUCCESS,
                repo
            })

            // also replace the repo in repos list
            dispatch(replaceReposListItem(repo))

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.REMOVE_TAG_FOR_REPO_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}

export const getSelectedRepoTags = (repoId) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.QUERY_REPO_TAGS,
            tags: []
        })

        const state = getState()

        const dbHandler = new DBHandler(state.db)
        return dbHandler.initDB().then(() => dbHandler.getRepoTags(repoId))
        .then((tags) => {
            dispatch({
                type: CONSTANTS.QUERY_REPO_TAGS_SUCCESS,
                tags
            })

            // also add tags to the repo and replace the repo in repos list
            let repo = state.repos['_' + repoId]
            if (repo) {
                repo._tags = tags
                dispatch(replaceReposListItem(repo))
            }

            return tags
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.QUERY_REPO_TAGS_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}

export const fetchRepoReadMe = (repo) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_REPO_README
        })

        const state = getState()
        const client = new GithubClient(state.credentials)
        return client.getRepoReadMe(repo.fullName, repo.defaultBranch)
        .then((readme) => {
            dispatch({
                type: CONSTANTS.FETCH_REPO_README_SUCCESS,
                readme
            })

            // if it's selected repo, update the state
            dispatch(updateSelectedRepo(repo.id, {readme}))

            return readme
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.FETCH_REPO_README_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}

// currently used after fetch the selected repo's readme data
export const updateSelectedRepo = (id, obj) => {
    return (dispatch, getState) => {
        const state = getState()

        if (!state.selectedRepo || state.selectedRepo.id !== id) {
            return
        }

        dispatch({
            type: CONSTANTS.UPDATE_SELECTED_REPO
        })

        const dbHandler = new DBHandler(getState().db)
        obj.id = id
        return dbHandler.initDB().then(() => dbHandler.updateRepo(obj))
        .then((repo) => {
            dispatch({
                type: CONSTANTS.UPDATE_SELECTED_REPO_SUCCESS,
                repo
            })

            // also replace the repo in repos list
            dispatch(replaceReposListItem(repo))

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.UPDATE_SELECTED_REPO_FAIL,
                err
            })

            return err
        })
    }
}
