import * as CONSTANTS                from '../constants'

export const updateSearchCondition = (search) => {
    return {
        type: CONSTANTS.UPDATE_SEARCH_CONDITION,
        search
    }
}

export const updateFilterCondition = (filter) => {
    return {
        type: CONSTANTS.UPDATE_FILTER_CONDITION,
        filter
    }
}

export const updateOrderCondition = (order) => {
    return {
        type: CONSTANTS.UPDATE_ORDER_CONDITION,
        order
    }
}

export const updateCategoryCondition = (category) => {
    return {
        type: CONSTANTS.UPDATE_CATEGORY_CONDITION,
        category
    }
}
