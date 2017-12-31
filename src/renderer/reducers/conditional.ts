import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import {
    ISearchConditionState,
    IFilterConditionState,
    IOrderConditionState,
    IGroupConditionState
} from "../interface/IConditional";

const searchConditionDefaultState: ISearchConditionState = {
    key: "",
    field: CONSTANTS.SEARCH_FIELD_ALL
};

export const searchConditionReducer = (
    state = searchConditionDefaultState,
    action: IAction
): ISearchConditionState => {
    switch (action.type) {
        case CONSTANTS.UPDATE_SEARCH_CONDITION:
            return {
                key: action.payload.search.key,
                field: action.payload.search.field // TODO validation
            };
        default:
            return state;
    }
};

const filterConditionDefaultState: IFilterConditionState = {
    hasFlag: false,
    hasNote: false,
    unread: false
};

export const filterConditionReducer = (
    state = filterConditionDefaultState,
    action: IAction
): IFilterConditionState => {
    switch (action.type) {
        case CONSTANTS.UPDATE_FILTER_CONDITION:
            return action.payload.filter ? action.payload.filter : filterConditionDefaultState; // TODO validation
        default:
            return state;
    }
};

const orderConditionDefaultState: IOrderConditionState = {
    by: CONSTANTS.ORDER_BY_DEFAULT,
    desc: true
};

export const orderConditionReducer = (
    state = orderConditionDefaultState,
    action: IAction
): IOrderConditionState => {
    switch (action.type) {
        case CONSTANTS.UPDATE_ORDER_CONDITION:
            return Object.assign({}, action.payload.order);
        default:
            return state;
    }
};

const groupConditionDefaultState: IGroupConditionState = {
    type: CONSTANTS.GROUP_TYPE_ALL,
    id: CONSTANTS.GROUP_TYPE_ALL // 0
};

export const groupConditionReducer = (
    state = groupConditionDefaultState,
    action: IAction
): IGroupConditionState => {
    switch (action.type) {
        case CONSTANTS.UPDATE_GROUP_CONDITION:
            return Object.assign({}, action.payload.group);
        default:
            return state;
    }
};
