import { ipcMain }          from 'electron'
import * as EVENTS          from '../../shared/events'
import * as CONSTANTS       from '../../shared/constants'
import keytar               from 'keytar'

const mainGetLocalCredentials = (username) => {
  let password = keytar.getPassword(CONSTANTS.APP, username)
  return password
}


const mainSaveCredentials = (credentials) => {
  return keytar.addPassword(CONSTANTS.APP, credentials.username, credentials.password)
}

const handleCredentialsEvents = () => {
  ipcMain.on(EVENTS.GET_LOCAL_CREDENTIALS, (event, username) => {
    let credentials = mainGetLocalCredentials(username)
    event.sender.send(EVENTS.GET_LOCAL_CREDENTIALS_REPLY, JSON.stringify(credentials))
  })

  ipcMain.on(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, (event, credentials) => {
    let result = mainSaveCredentials(credentials)
    event.sender.send(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM_REPLY, result)
  })
}
