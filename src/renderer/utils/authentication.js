import GithubClient           from './githubClient'
import * as EVENTS            from '../../shared/events'
import * as SHAREDCONSTANTS   from '../../shared/constants'
import * as CONSTANTS         from '../constants'
import { ipcRenderer }        from 'electron'
import Promise                from 'bluebird'
import DBHandler              from '../rxdb/dbHandler'
import dbName                 from './dbName'

export default class Authentication {

  static getLocalCredentials () {
    let promise = new Promise((resolve, reject) => {
      let username = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY)
      if (!username) {
        reject(new Error('no local login record'))
      } else {
        ipcRenderer.send(EVENTS.GET_LOCAL_CREDENTIALS, username)
        ipcRenderer.once(EVENTS.GET_LOCAL_CREDENTIALS_REPLY, (event, arg) => {
          !arg && reject(new Error('retrieve password from keychain failed'))
          let credentials = JSON.parse(arg)
          if (credentials.username && credentials.password) {
            resolve(credentials)
          } else {
            reject(new Error('retrieve password from keychain failed'))
          }
        })
      }
    })

    return promise
  }

  static saveCredentialsToSystem (credentials) {
    let promise = new Promise((resolve, reject) => {
      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY, credentials.username)
      ipcRenderer.send(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, JSON.stringify(credentials))
      ipcRenderer.once(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM_REPLY, (event, result) => {
        if (result) {
          resolve(credentials)
        } else {
          reject(new Error('save credentials to keychain failed'))
        }
      })
    })

    return promise
  }

  static saveProfileToLocal (profile) {
    let promise = new Promise((resolve, reject) => {
      // localStorage.setItem(CONSTANTS.LOCAL_STORAGE_USER_PROFILE, JSON.stringify(profile))
      resolve(profile)
    })

    return promise
  }

  static deleteLocalCredentials () {
    let promise = new Promise((resolve, reject) => {
      let username = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY)
      if (!username) {
        resolve('')
      } else {
        ipcRenderer.send(EVENTS.DELETE_LOCAL_CREDENTIALS, username)
        ipcRenderer.once(EVENTS.DELETE_LOCAL_CREDENTIALS_REPLY, (event, result) => {
          result ? resolve(username) : reject(new Error('delete credentials from keychain failed'))
        })
      }
    })

    return promise
  }

  static signInApp (credentials) {
    let githubClient = new GithubClient(credentials)
    return githubClient.getMyProfile()
    .then((profile) => {
      // success stuff
      if (profile.login === credentials.username) {
        // save credentials to windows credentials
        let p1 = Authentication.saveCredentialsToSystem(credentials, null)
        let p2 = Authentication.saveProfileToLocal(profile, null)
        // init rxdb and save profile to db
        const dbHandler = new DBHandler(dbName(credentials.username))
        let p3 = dbHandler.initDB().then(() => dbHandler.upsertProfile(profile))

        // show main window now and close login window
        setTimeout(() => {
            ipcRenderer.send(EVENTS.SHOW_MAIN_WIN_AND_CLOSE_LOGIN_WIN, JSON.stringify(credentials))
        }, 3000)

        return Promise.all([p1, p2, p3]).then(() => profile)
      } else {
        return new Error('The token you provided does not match this account')
      }
    })
    .catch((err) => {
      return err
    })
  }

  static signOutApp () {
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY)
    return Authentication.deleteLocalCredentials()
  }
}
