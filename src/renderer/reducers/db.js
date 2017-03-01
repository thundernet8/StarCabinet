import * as CONSTANTS     from '../constants'

let initialState = null

export const dbConnectReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.DB_CONNECTED:
            return action.db
        case CONSTANTS.DB_DISCONNECTED:
            return null
        default:
            return state
    }
}
