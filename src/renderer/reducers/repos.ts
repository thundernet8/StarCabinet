import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import IRepo, { IRepoFetchingStatus } from "../interface/IRepo";

export const reposListReducer = (state = {}, action: IAction): { [key: string]: IRepo } => {
    switch (action.type) {
        case CONSTANTS.QUERY_REPOS_LIST_SUCCESS:
        case CONSTANTS.REPLACE_REPOS_LIST_ITEM:
            return action.payload.repos;
        case CONSTANTS.QUERY_REPOS_LIST_FAIL:
        default:
            return state;
    }
};

export const reposIncreaseReducer = (state = 0, action: IAction): number => {
    switch (action.type) {
        case CONSTANTS.FETCH_REPOS_LIST_SUCCESS:
            return action.payload.increase;
        case CONSTANTS.CLEAR_INCREASE_PROP:
            return 0;
        default:
            return state;
    }
};

const initialFetchState = {
    fetching: false,
    success: null
};

export const fetchingReposStatusReducer = (
    state = initialFetchState,
    action: IAction
): IRepoFetchingStatus => {
    switch (action.type) {
        case CONSTANTS.FETCH_REPOS_LIST:
            return {
                fetching: true,
                success: initialFetchState.success
            };
        case CONSTANTS.FETCH_REPOS_LIST_SUCCESS:
            return {
                fetching: false,
                success: true
            };
        case CONSTANTS.FETCH_REPOS_LIST_FAIL:
            return {
                fetching: false,
                success: false
            };
        default:
            return state;
    }
};
