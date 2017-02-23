import { ipcMain, BrowserWindow }      from 'electron'
import * as EVENTS                     from '../../shared/events'

const windowLifeCycle = () => {
  // handle close window events
  ipcMain.on(EVENTS.CLOSE_LOGIN, (event, arg) => {
    let window = BrowserWindow.getFocusedWindow()
    window.close()
  })
}

export default windowLifeCycle
