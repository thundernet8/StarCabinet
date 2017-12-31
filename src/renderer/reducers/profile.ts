import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import IProfile from "../interface/IProfile";

export const profileReducer = (state = null, action: IAction): IProfile | null => {
    switch (action.type) {
        case CONSTANTS.QUERY_MY_PROFILE_SUCCESS:
            return action.payload.profile;
        case CONSTANTS.QUERY_MY_PROFILE_FAIL:
        default:
            return state;
    }
};
