import * as CONSTANTS     from '../constants'
import * as EVENTS        from '../../shared/events'
import GithubClient       from '../utils/githubClient'
import Authentication     from '../utils/authentication'
import { ipcRenderer }    from 'electron'

export const credentialsReducer = (state = {username: '', password: ''}, action) => {
  switch (action.type) {
    case CONSTANTS.GET_LOCAL_CREDENTIALS_SUCCESS:
      return {
        username: action.credentials.username,
        password: action.credentials.password
      }
    case CONSTANTS.GET_LOCAL_CREDENTIALS_FAIL:
    default:
      return state
  }
}

export const loginResultReducer = (state = {success: null, profile: null}, action) => {
  switch (action.type) {
    case CONSTANTS.REQUEST_LOGIN_SUCCESS:
      action.callback(true, 'login successfully')
      return {
        success: true,
        profile: action.profile
      }
    case CONSTANTS.REQUEST_LOGIN_FAIL:
      action.callback(false, action.msg)
      return {
        success: false,
        profile: null
      }
    default:
      return state
  }
}
