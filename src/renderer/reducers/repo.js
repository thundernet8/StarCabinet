import * as CONSTANTS     from '../constants'

export const selectedRepoIdReducer = (state = 0, action) => {
    switch (action.type) {
        case CONSTANTS.SELECT_ONE_REPO:
            return action.id
        default:
            return state
    }
}
