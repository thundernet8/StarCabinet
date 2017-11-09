import * as CONSTANTS from "../constants";
import Authentication from "../utils/authentication";

export const getLocalCredentials = (autoSignin = false) => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.GET_LOCAL_CREDENTIALS
        });

        return Authentication.getLocalCredentials()
            .then(credentials => {
                dispatch({
                    type: CONSTANTS.GET_LOCAL_CREDENTIALS_SUCCESS,
                    credentials
                });

                // auto signin
                if (autoSignin) {
                    return Authentication.signInApp(credentials)
                        .then(profile => {
                            dispatch({
                                type: CONSTANTS.REQUEST_LOGIN_SUCCESS,
                                profile
                            });
                            return "login successfully";
                        })
                        .catch(err => {
                            dispatch({
                                type: CONSTANTS.REQUEST_LOGIN_FAIL,
                                profile: null,
                                msg: err.message
                            });
                            return err;
                        });
                }
                return credentials;
            })
            .catch(err => {
                dispatch({
                    type: CONSTANTS.GET_LOCAL_CREDENTIALS_FAIL,
                    credentials: null
                });
                return err;
            });
    };
};

export const requestLogin = credentials => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.REQUEST_LOGIN
        });

        return Authentication.signInApp(credentials)
            .then(profile => {
                dispatch({
                    type: CONSTANTS.REQUEST_LOGIN_SUCCESS,
                    profile,
                    msg: ""
                });
                return profile;
            })
            .catch(err => {
                dispatch({
                    type: CONSTANTS.REQUEST_LOGIN_FAIL,
                    profile: null,
                    msg: err.message
                });
                return err;
            });
    };
};
