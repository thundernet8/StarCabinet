import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";

export const dbConnectReducer = (state = null, action: IAction) => {
    switch (action.type) {
        case CONSTANTS.DB_CONNECTED:
            return action.payload.db;
        case CONSTANTS.DB_DISCONNECTED:
            return null;
        default:
            return state;
    }
};
