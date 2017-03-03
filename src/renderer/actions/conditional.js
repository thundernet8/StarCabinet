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

export const updateSortCondition = (sort) => {
    return {
        type: CONSTANTS.UPDATE_SORT_CONDITION,
        sort
    }
}

export const updateCategoryCondition = (category) => {
    return {
        type: CONSTANTS.UPDATE_CATEGORY_CONDITION,
        category
    }
}
