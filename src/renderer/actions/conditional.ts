import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import {
    ISearchConditionState,
    IFilterConditionState,
    IOrderConditionState,
    IGroupConditionState
} from "../interface/IConditional";

export const updateSearchCondition = (search: ISearchConditionState): IAction => {
    return {
        type: CONSTANTS.UPDATE_SEARCH_CONDITION,
        payload: { search }
    };
};

export const updateFilterCondition = (filter: IFilterConditionState): IAction => {
    return {
        type: CONSTANTS.UPDATE_FILTER_CONDITION,
        payload: { filter }
    };
};

export const updateOrderCondition = (order: IOrderConditionState): IAction => {
    return {
        type: CONSTANTS.UPDATE_ORDER_CONDITION,
        payload: { order }
    };
};

export const updateGroupCondition = (group: IGroupConditionState): IAction => {
    return {
        type: CONSTANTS.UPDATE_GROUP_CONDITION,
        payload: { group }
    };
};
