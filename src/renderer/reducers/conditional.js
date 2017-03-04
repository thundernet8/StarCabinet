import * as CONSTANTS     from '../constants'

const initialSearchCondition = {
    key: '',
    field: CONSTANTS.SEARCH_FIELD_ALL
}

export const searchConditionReducer = (state = initialSearchCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_SEARCH_CONDITION:
            return {
                key: action.search.key,
                field: action.search.field // TODO validation
            }
        default:
            return state
    }
}

const initialFilterCondition = CONSTANTS.FILTER_TYPE_NONE

export const filterConditionReducer = (state = initialFilterCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_SEARCH_CONDITION:
            return action.filter ? action.filter : initialFilterCondition // TODO validation
        default:
            return state
    }
}

const initialOrderCondition = {
    by: CONSTANTS.ORDER_BY_DEFAULT,
    desc: true
}

export const orderConditionReducer = (state = initialOrderCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_ORDER_CONDITION:
            return Object.assign({}, action.order)
        default:
            return state
    }
}

const initialCategoryCondition = {
    type: CONSTANTS.CATEGORY_TYPE_ALL,
    id: 0
}

export const categoryConditionReducer = (state = initialCategoryCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_CATEGORY_CONDITION:
            return Object.assign({}, action.category)
        default:
            return state
    }
}
