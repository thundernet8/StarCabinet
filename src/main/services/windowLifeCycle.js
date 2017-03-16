import { ipcMain, BrowserWindow }      from 'electron'
import * as EVENTS                     from '../../shared/events'
import createMainWindow                from '../windows/main'
import createSettingWindow             from '../windows/setting'

const windowLifeCycle = (globalWin) => {
  // handle open/close window events
  ipcMain.on(EVENTS.CLOSE_LOGIN, (event, arg) => {
    let window = BrowserWindow.getFocusedWindow()
    window.close()
  })

  ipcMain.on(EVENTS.OPEN_SETTING_WIN, (event, arg) => {
      if (globalWin.setting) return
      createSettingWindow(globalWin)
  })

  ipcMain.on(EVENTS.CLOSE_SETTING_WIN, (event, arg) => {
      if (!globalWin.setting) return
      globalWin.setting.close()
  })

  // user logged in -> close login window and open main window
  ipcMain.on(EVENTS.SHOW_MAIN_WIN_AND_CLOSE_LOGIN_WIN, (event, credentials) => {
    if (!globalWin.login) return
    createMainWindow(globalWin)
    globalWin.login.close()
    // globalWin.login = null // not need
  })
}

export default windowLifeCycle
