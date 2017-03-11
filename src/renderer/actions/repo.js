import * as CONSTANTS                from '../constants'
import DBHandler                     from '../rxdb/dbHandler'

export const selectOneRepo = (id) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.SELECT_ONE_REPO,
            id: id
        })
    }
}

export const rateOneRepo = (id, score) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.RATE_ONE_REPO,
            id,
            score
        })

        const updateObj = {
            id,
            score
        }
        const dbHandler = new DBHandler(getState().db)
        dbHandler.initDB().then(() => dbHandler.updateRepo(updateObj))
        .then((repo) => {
            dispatch({
                type: CONSTANTS.RATE_ONE_REPO_SUCCESS,
                repo
            })

            return repo
        })
        .catch((err) => {
            dispatch({
                type: CONSTANTS.RATE_ONE_REPO_FAIL,
                err
            })

            return err
        })
    }
}
