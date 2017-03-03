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
