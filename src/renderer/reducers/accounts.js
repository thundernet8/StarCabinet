import * as Constant      from '../constants'

export const accountsReducer = (state = {username: '', password: ''}, action) => {
  switch (action.type) {
    case Constant.GET_LOCAL_CREDENTIALS:
      return {
        username: 'name', // TODO
        password: 'pwd'
      }
    case Constant.CLEAR_LOGIN_USERNAME:
      return {
        username: ''
      }
    case Constant.CLEAR_LOGIN_PASSWORD:
      return {
        password: ''
      }
    case Constant.CHANGE_LOGIN_USERNAME:
      return {
        username: action.username
      }
    case Constant.CHANGE_LOGIN_PASSWORD:
      return {
        password: action.password
      }
    default:
      return state
  }
}
