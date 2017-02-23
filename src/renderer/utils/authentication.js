import GithubClient           from './githubClient'
import * as EVENTS            from '../../shared/events'
import * as SHAREDCONSTANTS   from '../../shared/constants'
import * as CONSTANTS         from '../constants'
import { ipcRenderer }        from 'electron'

export default class Authentication {

  static getLocalCredentials (callback) {
    let username = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY)

    if (username !== null) {
      ipcRenderer.send(EVENTS.GET_LOCAL_CREDENTIALS, username)
      ipcRenderer.once(EVENTS.GET_LOCAL_CREDENTIALS_REPLY, (event, arg) => {
        let credentials = arg !== null ? JSON.parse(arg) : null
        typeof callback === 'function' && callback(credentials)
      })
    } else {
      typeof callback === 'function' && callback(null)
    }
  }

  static saveCredentialsToSystem (credentials, callback) {
    localStorage.setItem(SHAREDCONSTANTS.APP, credentials.username)
    ipcRenderer.send(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, JSON.stringify(credentials))
    ipcRenderer.once(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM_REPLY, (event, result) => {
      typeof callback === 'function' && callback(!!result)
    })
  }

  static signInApp (credentials, callback) {
    let githubClient = new GithubClient(credentials)
    githubClient.getMyProfile((err, profile) => {
      callback(err, profile)
      // save credentials to windows credentials
      if (!err && profile.username === credentials.username) Authentication.saveCredentialsToSystem(credentials, null)
    })
  }

  static signOutApp (callback) {
    // TODO
  }
}
