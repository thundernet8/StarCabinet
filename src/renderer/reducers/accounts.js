import * as Constant      from '../constants'

export const credentialsReducer = (state = {username: '', password: ''}, action) => {
  switch (action.type) {
    case Constant.GET_LOCAL_CREDENTIALS:
      return {
        username: 'name', // TODO
        password: 'pwd'
      }
    default:
      return state
  }
}

export const loginResultReducer = (state = {success: null, msg: ''}, action) => {
  switch (action.type) {
    case Constant.REQUEST_LOGIN:
      // TODO
      return {
        success: true,
        msg: 'login successfully'
      }
    default:
      return state
  }
}
