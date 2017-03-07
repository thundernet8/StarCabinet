import * as CONSTANTS               from '../constants'

export const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.QUERY_CATEGORIES_LIST_SUCCESS:
            return action.categories
        case CONSTANTS.QUERY_CATEGORIES_LIST_FAIL:
        default:
            return state
    }
}
