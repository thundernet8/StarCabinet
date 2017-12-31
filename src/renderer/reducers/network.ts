import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import IOfflineState from "../interface/IOffline";

let initialState: IOfflineState = {
    value: navigator.onLine ? null : true, // null for first time online value
    time: 0
};

export const offlineReducer = (state = initialState, action: IAction): IOfflineState => {
    switch (action.type) {
        case CONSTANTS.APP_OFFLINE:
            return {
                value: true,
                time: Math.floor(new Date().getTime() / 1000)
            };
        case CONSTANTS.APP_ONLINE:
            return {
                value: false,
                time: Math.floor(new Date().getTime() / 1000) // time of re-online
            };
        default:
            return state;
    }
};
