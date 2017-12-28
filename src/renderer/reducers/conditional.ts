import * as CONSTANTS from "../constants";

const initialSearchCondition = {
    key: "",
    field: CONSTANTS.SEARCH_FIELD_ALL
};

export const searchConditionReducer = (state = initialSearchCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_SEARCH_CONDITION:
            return {
                key: action.search.key,
                field: action.search.field // TODO validation
            };
        default:
            return state;
    }
};

const initialFilterCondition = {
    hasFlag: false,
    hasNote: false,
    unread: false
};

export const filterConditionReducer = (state = initialFilterCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_FILTER_CONDITION:
            return action.filter ? action.filter : initialFilterCondition; // TODO validation
        default:
            return state;
    }
};

const initialOrderCondition = {
    by: CONSTANTS.ORDER_BY_DEFAULT,
    desc: true
};

export const orderConditionReducer = (state = initialOrderCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_ORDER_CONDITION:
            return Object.assign({}, action.order);
        default:
            return state;
    }
};

const initialGroupCondition = {
    type: CONSTANTS.GROUP_TYPE_ALL,
    id: CONSTANTS.GROUP_TYPE_ALL // 0
};

export const groupConditionReducer = (state = initialGroupCondition, action) => {
    switch (action.type) {
        case CONSTANTS.UPDATE_GROUP_CONDITION:
            return Object.assign({}, action.group);
        default:
            return state;
    }
};
