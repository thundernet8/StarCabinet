import { ipcMain, BrowserWindow }  from 'electron'
import * as EVENTS                 from '../../shared/events'

export const saveCredentials = (): void => {
  ipcMain.on(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, (event, arg) => {
    let credentials: any = JSON.parse(arg)
    let saveInfo: any = {
        service: 'StarCabinet'
    }
  })
}