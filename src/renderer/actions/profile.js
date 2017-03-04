import * as CONSTANTS                       from '../constants'
import DBHandler                            from '../rxdb/dbHandler'

export const getMyProfile = (username = '') => {
    return (dispatch, getState) => {
        const dbHandler = new DBHandler(getState().db)
        dbHandler.initDB().then(() => dbHandler.getProfile(username))
        .then((profile) => {
            dispatch({
                type: CONSTANTS.QUERY_MY_PROFILE_SUCCESS,
                profile
            })
            return profile
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.QUERY_MY_PROFILE_FAIL,
                err
            })
            return err
        })
    }
}
