import * as CONSTANTS from "../constants";
import * as Database from "../rxdb/database";

export const dbConnectionChange = (connected, db = null) => {
    if (connected) {
        return {
            type: CONSTANTS.DB_CONNECTED,
            db: db
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
