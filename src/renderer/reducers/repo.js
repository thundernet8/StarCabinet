import * as CONSTANTS     from '../constants'

export const selectedRepoReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.SELECT_ONE_REPO:
            return action.repo
        default:
            return state
    }
}
