import GithubClient           from './githubClient'
import * as EVENTS            from '../../shared/events'
import * as SHAREDCONSTANTS   from '../../shared/constants'
import * as CONSTANTS         from '../constants'
import { ipcRenderer }        from 'electron'

export default class Authentication {

  static getLocalCredentials (callback) {
    let username = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY)

    if (username != null) {
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
    localStorage.setItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY, credentials.username)
    ipcRenderer.send(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, JSON.stringify(credentials))
    ipcRenderer.once(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM_REPLY, (event, result) => {
      typeof callback === 'function' && callback(!!result)
    })
  }

  static deleteLocalCredentials (callback) {
    let username = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY)

    if (username != null) {
      ipcRenderer.send(EVENTS.DELETE_LOCAL_CREDENTIALS, username)
      ipcRenderer.once(EVENTS.GET_LOCAL_CREDENTIALS_REPLY, (event, result) => {
        typeof callback === 'function' && callback(result)
      })
    } else {
      typeof callback === 'function' && callback(true)
    }
  }

  static signInApp (credentials, callback) {
    let githubClient = new GithubClient(credentials)
    githubClient.getMyProfile((err, profile) => {
      let msg = ''
      if (!err && profile.login !== credentials.username) {
        msg = 'The token you provided does not match this account'
      } else if (err) {
        msg = err.message
      }
      typeof callback === 'function' && callback(msg, profile)
      // save credentials to windows credentials
      if (!err && profile.login === credentials.username) Authentication.saveCredentialsToSystem(credentials, null)
    })
  }

  static signOutApp (callback) {
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY)
    Authentication.deleteLocalCredentials(callback)
  }
}
