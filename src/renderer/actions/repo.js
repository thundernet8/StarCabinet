import * as CONSTANTS                from '../constants'
import DBHandler                     from '../rxdb/dbHandler'
import GithubClient                  from '../utils/githubClient'
import { replaceReposListItem }      from './repos'
import { updateCategoriesList }      from './categories'

export const selectOneRepo = (repo) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.SELECT_ONE_REPO,
            repo
        })

        // when selected, the repo mark as read
        dispatch(updateSelectedRepo(repo.id, {read: true}))
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

            // also replace new repo into repos list
            dispatch(replaceReposListItem(repo))

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.RATE_ONE_REPO_FAIL,
                err
            })

            throw new Error(err)
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
            throw new Error(err)
        })
    }
}

export const addTagForRepo = (id, tagName) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.ADD_TAG_FOR_REPO
        })

        const state = getState()

        const dbHandler = new DBHandler(state.db)
        return dbHandler.initDB().then(() => dbHandler.addRepoTag(id, tagName))
        .then((repo) => {
            // also replace the repo in repos list
            dispatch(replaceReposListItem(repo))

            // if it has same id with selectedRepo, also replace selectedRepo
            dispatch(updateSelectedRepo(id, {rxChange: parseInt((new Date()).getTime() / 1000)}))

            dispatch({
                type: CONSTANTS.ADD_TAG_FOR_REPO_SUCCESS,
                repo
            })

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

        const state = getState()

        const dbHandler = new DBHandler(state.db)
        return dbHandler.initDB().then(() => dbHandler.removeRepoTag(id, tagName))
        .then((repo) => {
            // also replace the repo in repos list
            dispatch(replaceReposListItem(repo))

            // if it has same id with selectedRepo, also replace selectedRepo
            dispatch(updateSelectedRepo(id, {rxChange: parseInt((new Date()).getTime() / 1000)}))

            dispatch({
                type: CONSTANTS.REMOVE_TAG_FOR_REPO_SUCCESS,
                repo
            })

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

export const getSelectedRepoCategories = (repoId) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.QUERY_REPO_CATEGORIES,
            categories: []
        })

        const state = getState()

        const dbHandler = new DBHandler(state.db)
        return dbHandler.initDB().then(() => dbHandler.getRepoCategories(repoId))
        .then((categories) => {
            dispatch({
                type: CONSTANTS.QUERY_REPO_CATEGORIES_SUCCESS,
                categories
            })

            // also add categories to the repo and replace the repo in repos list
            let repo = state.repos['_' + repoId]
            if (repo) {
                repo._categories = categories
                dispatch(replaceReposListItem(repo))
            }

            return categories
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.QUERY_REPO_CATEGORIES_FAIL,
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

            // if it's selected repo, save it to db and update the state
            if (repo.readme !== readme) {
                dispatch(updateSelectedRepo(repo.id, {readme}))
            }

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

export const fetchRepoContributors = (repo) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_REPO_CONTRIBUTORS
        })

        const state = getState()
        const client = new GithubClient(state.credentials)
        return client.getRepoContributors(repo.fullName)
        .then((contributors) => {
            dispatch({
                type: CONSTANTS.FETCH_REPO_CONTRIBUTORS_SUCCESS,
                contributors
            })

            // save contributors to db
            dispatch(updateRepoContributors(repo.id, contributors))

            return contributors
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.FETCH_REPO_CONTRIBUTORS_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}

// currently used after fetch the selected repo's readme data
// alse repo note (simple fields)
export const updateSelectedRepo = (id, obj) => {
    return (dispatch, getState) => {
        const state = getState()

        if (!state.selectedRepo || state.selectedRepo.id !== id) {
            return
        }

        dispatch({
            type: CONSTANTS.UPDATE_SELECTED_REPO
        })

        const dbHandler = new DBHandler(state.db)
        obj.id = id
        return dbHandler.initDB().then(() => dbHandler.updateRepo(obj))
        .then((repo) => {
            // also replace the repo in repos list
            repo._hotChange = Object.keys(obj) // mark the repo that its readme etc.. has fetched, do not fetch again
            dispatch(replaceReposListItem(repo))

            dispatch({
                type: CONSTANTS.UPDATE_SELECTED_REPO_SUCCESS,
                repo
            })

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.UPDATE_SELECTED_REPO_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}

export const updateRepoCategories = (id, catIds) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.UPDATE_REPO_CATEGORIES,
            id
        })

        const state = getState()

        const dbHandler = new DBHandler(state.db)
        return dbHandler.initDB().then(() => dbHandler.updateRepoCategories(id, catIds))
        .then((repo) => {
            // also replace the repo in repos list
            dispatch(replaceReposListItem(repo))

            // if it has same id with selectedRepo, also replace selectedRepo
            dispatch(updateSelectedRepo(id, {rxChange: parseInt((new Date()).getTime() / 1000)}))

            dispatch({
                type: CONSTANTS.UPDATE_REPO_CATEGORIES_SUCCESS,
                repo
            })

            // update all categories list, for updating the nav category node
            dispatch(updateCategoriesList())

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.UPDATE_REPO_CATEGORIES_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}

export const updateRepoContributors = (id, contributors) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.UPDATE_REPO_CONTRIBUTORS,
            id
        })

        const state = getState()

        const dbHandler = new DBHandler(state.db)
        return dbHandler.initDB().then(() => dbHandler.upsertContributors(id, contributors))
        .then((contributors) => {
            // also replace the repo in repos list
            let repo = state.repos['_' + id]
            if (repo) {
                repo._contributors = contributors
                repo._hotChange = ['contributors']
                dispatch(replaceReposListItem(repo))
            }

            // if it has same id with selectedRepo, also replace selectedRepo
            dispatch(updateSelectedRepo(id, {rxChange: parseInt((new Date()).getTime() / 1000)}))

            dispatch({
                type: CONSTANTS.UPDATE_REPO_CONTRIBUTORS_SUCCESS,
                repo
            })

            return repoInList
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.UPDATE_REPO_CONTRIBUTORS_FAIL,
                err
            })

            throw new Error(err)
        })
    }
}
