import * as Constant      from '../constants'
import * as EVENTS        from '../../shared/events'
import GithubClient       from '../utils/githubClient'
import Authentication     from '../utils/authentication'
import { ipcRenderer }    from 'electron'

export const credentialsReducer = (state = {username: '', password: ''}, action) => {
  switch (action.type) {
    case Constant.GET_LOCAL_CREDENTIALS:
      Authentication.getLocalCredentials((credentials) => {
        return {
          username: credentials ? credentials.username : '',
          password: credentials ? credentials.password : ''
        }
      })
      return state
    default:
      return state
  }
}

export const loginResultReducer = (state = {success: null, msg: ''}, action) => {
  switch (action.type) {
    case Constant.REQUEST_LOGIN:
      Authentication.signInApp(action.credentials, (err, profile) => {
        if (err) {
          return {
            success: false,
            msg: err.toString()
          }
        } else {
          return {
            success: true,
            msg: 'login successfully'
          }
        }
      })
      return state
    default:
      return state
  }
}
