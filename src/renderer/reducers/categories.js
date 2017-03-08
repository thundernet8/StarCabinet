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

export const categoryAddingResultReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_CUSTOM_CATEGORY_SUCCESS:
            return {
                category: action.category,
                success: true
            }
        case CONSTANTS.ADD_CUSTOM_CATEGORY_FAIL:
            return {
                error: action.error
            }
        default:
            return state
    }
}
