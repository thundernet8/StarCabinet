import { ipcMain, BrowserWindow }       from 'electron'
import * as EVENTS                      from'../../shared/events'

function windowLifeCycle () {
  // handle close window events
  ipcMain.on(EVENTS.CLOSE_LOGIN, (event, arg) => {
    let window = BrowserWindow.getFocusedWindow()
    window.close()
  })
}

module.exports = windowLifeCycle
