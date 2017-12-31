import * as CONSTANTS from "../constants";
import * as Database from "../rxdb/database";
import IAction from "../interface/IAction";
import { RxDatabase } from "rxdb";

export const dbConnectionChange = (connected, db: RxDatabase): IAction => {
    if (connected) {
        return {
            type: CONSTANTS.DB_CONNECTED,
            payload: { db }
        };
    }
    return {
        type: CONSTANTS.DB_DISCONNECTED
    };
};

let _connectRxDB = async (dbName, dispatch) => {
    dispatch({
        type: CONSTANTS.DB_CONNECTING
    });

    const db = await Database.get(dbName, dispatch);

    dispatch(dbConnectionChange(true, db));

    return db;
};

export const connectRxDB = dbName => {
    return dispatch => _connectRxDB(dbName, dispatch);
};
