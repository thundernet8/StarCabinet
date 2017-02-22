import * as Constant      from '../constants'
import * as EVENTS        from '../../shared/events'
import GithubClient       from '../utils/githubClient'
import { ipcRenderer }    from 'electron'

import { ICredentials }   from '../../interfaces/ICredentials'

export const credentialsReducer = (state: ICredentials = {username: '', password: ''}, action) => {
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
      var client = new GithubClient(action.credentials)
      client.verifyLoginStatus(function (err, res) {
        // save credentials to windows credentials
        ipcRenderer.send(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, JSON.stringify(action.credentials))
        console.log(err)
        console.log(res)
      })

      return {
        success: true,
        msg: 'login successfully'
      }
    default:
      return state
  }
}
