import * as CONSTANTS               from '../constants'

export const languagesReducer = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.QUERY_LANGUAGES_LIST_SUCCESS:
            return action.languages
        case CONSTANTS.QUERY_LANGUAGES_LIST_FAIL:
        default:
            return state
    }
}
