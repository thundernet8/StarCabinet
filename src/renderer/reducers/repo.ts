import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import IRepo from "../interface/IRepo";
import ITag from "../interface/ITag";
import ICategory from "../interface/ICategory";

export const selectedRepoReducer = (state = null, action: IAction): IRepo | null => {
    switch (action.type) {
        case CONSTANTS.SELECT_ONE_REPO:
        case CONSTANTS.UPDATE_SELECTED_REPO_SUCCESS:
            // case CONSTANTS.ADD_TAG_FOR_REPO_SUCCESS:
            // case CONSTANTS.REMOVE_TAG_FOR_REPO_SUCCESS:
            // case CONSTANTS.UPDATE_REPO_CATEGORIES_SUCCESS:
            // case CONSTANTS.UPDATE_REPO_CONTRIBUTORS_SUCCESS:
            return action.payload.repo;
        default:
            return state;
    }
};

export const selectedRepoTagsReducer = (state = [], action: IAction): ITag[] => {
    switch (action.type) {
        case CONSTANTS.QUERY_REPO_TAGS_SUCCESS:
            return action.payload.tags;
        default:
            return state;
    }
};

export const selectedRepoCatsReducer = (state = [], action: IAction): ICategory[] => {
    switch (action.type) {
        case CONSTANTS.QUERY_REPO_CATEGORIES_SUCCESS:
            return action.payload.categories;
        default:
            return state;
    }
};
