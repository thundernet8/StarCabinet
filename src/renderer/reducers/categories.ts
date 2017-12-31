import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import ICategory, { ICategoryCreateResult } from "../interface/ICategory";

const categoriesDefaultState: ICategory[] = [];

export const categoriesReducer = (state = categoriesDefaultState, action: IAction): ICategory[] => {
    switch (action.type) {
        case CONSTANTS.QUERY_CATEGORIES_LIST_SUCCESS:
            return action.payload.categories;
        case CONSTANTS.QUERY_CATEGORIES_LIST_FAIL:
        default:
            return state;
    }
};

const categoryAddingResultDefaultState: ICategoryCreateResult | null = null;

export const categoryAddingResultReducer = (
    state = categoryAddingResultDefaultState,
    action: IAction
): ICategoryCreateResult => {
    switch (action.type) {
        case CONSTANTS.ADD_CUSTOM_CATEGORY_SUCCESS:
            return {
                category: action.payload.category,
                success: true
            };
        case CONSTANTS.ADD_CUSTOM_CATEGORY_FAIL:
            return {
                success: false,
                error: action.error
            };
        default:
            return state as any;
    }
};
