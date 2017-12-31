import * as CONSTANTS from "../constants";
import IAction from "../interface/IAction";
import { RxDatabase } from "rxdb";

export const dbConnectReducer = (state = null, action: IAction): RxDatabase => {
    switch (action.type) {
        case CONSTANTS.DB_CONNECTED:
            return action.payload.db;
        case CONSTANTS.DB_DISCONNECTED:
            return null as any;
        default:
            return state as any;
    }
};
