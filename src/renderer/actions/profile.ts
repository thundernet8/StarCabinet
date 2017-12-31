import * as CONSTANTS from "../constants";
import DBHandler from "../rxdb/dbHandler";

export const getMyProfile = (username = "") => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.QUERY_MY_PROFILE
        });

        const dbHandler = new DBHandler(getState().db);
        dbHandler
            .initDB()
            .then(() => dbHandler.getProfile(username))
            .then(profile => {
                dispatch({
                    type: CONSTANTS.QUERY_MY_PROFILE_SUCCESS,
                    payload: { profile }
                });
                return profile;
            })
            .catch(error => {
                dispatch({
                    type: CONSTANTS.QUERY_MY_PROFILE_FAIL,
                    error
                });
                return error;
            });
    };
};
