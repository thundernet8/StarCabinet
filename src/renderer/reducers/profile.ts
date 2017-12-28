import * as CONSTANTS from "../constants";

export const profileReducer = (state = null, action) => {
    switch (action.type) {
        case CONSTANTS.QUERY_MY_PROFILE_SUCCESS:
            return action.profile;
        case CONSTANTS.QUERY_MY_PROFILE_FAIL:
        default:
            return state;
    }
};
