import {electron, app, BrowserWindow} from 'electron'
import path                           from 'path'
import fs                             from 'fs'
import url                            from 'url'
import createLoginWindow              from './windows/login'
import services                       from './services'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = {
  login: null,
  main: null
}

function createWindow () {
  if (win.login || win.main) return

  // Create the browser window.
  createLoginWindow(win)

  // Add React dev tools
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../chrome/ReactDevTool/2.0.12_0'))

  services.register(win)
}

// Make app single instance
let shouldQuit = app.makeSingleInstance(function (commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window.
  if (win.login) {
    win.login.focus()
  }
  if (win.main) {
    if (win.main.isMinimized()) win.main.restore()
    win.main.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    app.quit()
  // }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
