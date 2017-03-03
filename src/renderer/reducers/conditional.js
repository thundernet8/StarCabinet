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

