import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import ILanguage from "../interface/ILanguage";

export const languagesReducer = (state = [], action: IAction): ILanguage[] => {
    switch (action.type) {
        case CONSTANTS.QUERY_LANGUAGES_LIST_SUCCESS:
            return action.payload.languages;
        case CONSTANTS.QUERY_LANGUAGES_LIST_FAIL:
        default:
            return state;
    }
};
