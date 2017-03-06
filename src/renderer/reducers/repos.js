import * as CONSTANTS     from '../constants'

export const reposListReducer = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_REPOS_LIST_SUCCESS:
            return action.repos
        case CONSTANTS.UPDATE_REPOS_LIST_FAIL:
        default:
            return state
    }
}

const initialFetchState = {
    fetching: false,
    success: null
}

export const fetchingReposStatusReducer = (state = initialFetchState, action) => {
    switch (action.type) {
        case CONSTANTS.FETCH_REPOS_LIST:
            return {
                fetching: true,
                success: initialFetchState.success
            }
        case CONSTANTS.FETCH_REPOS_LIST_SUCCESS:
            return {
                fetching: false,
                success: true
            }
        case CONSTANTS.FETCH_REPOS_LIST_FAIL:
            return {
                fetching: false,
                success: false
            }
        default:
            return state
    }
}
