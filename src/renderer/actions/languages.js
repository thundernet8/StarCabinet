import * as CONSTANTS from "../constants";
import DBHandler from "../rxdb/dbHandler";

export const updateLanguagesList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.QUERY_LANGUAGES_LIST
        });

        const dbHandler = new DBHandler(getState().db);
        dbHandler
            .initDB()
            .then(() => dbHandler.getLanguages())
            .then(languages => {
                dispatch({
                    type: CONSTANTS.QUERY_LANGUAGES_LIST_SUCCESS,
                    languages
                });
                return languages;
            })
            .catch(err => {
                dispatch({
                    type: CONSTANTS.QUERY_LANGUAGES_LIST_FAIL,
                    err
                });
                return err;
            });
    };
};
