import * as CONSTANTS                from '../constants'

export const selectOneRepo = (id) => {
    return (dispatch) => {
        dispatch({
            type: CONSTANTS.SELECT_ONE_REPO,
            id: id
        })
    }
}
