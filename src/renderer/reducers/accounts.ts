import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import { ICredentialsState, ILoginResultState } from "../interface/IAccount";

const credentialsDefaultState: ICredentialsState = {
    username: "",
    password: ""
};

export const credentialsReducer = (
    state = credentialsDefaultState,
    action: IAction
): ICredentialsState => {
    switch (action.type) {
        case CONSTANTS.GET_LOCAL_CREDENTIALS_SUCCESS:
            const { username, password } = action.payload.credentials;
            return {
                username,
                password
            };
        case CONSTANTS.GET_LOCAL_CREDENTIALS_FAIL:
        default:
            return state;
    }
};

const loginResultDefaultState: ILoginResultState = {
    success: null,
    profile: null
};

export const loginResultReducer = (
    state = loginResultDefaultState,
    action: IAction
): ILoginResultState => {
    switch (action.type) {
        case CONSTANTS.REQUEST_LOGIN_SUCCESS:
            return {
                success: true,
                profile: action.payload.profile
            };
        case CONSTANTS.REQUEST_LOGIN_FAIL:
            return {
                success: false,
                profile: null
            };
        default:
            return state;
    }
};
