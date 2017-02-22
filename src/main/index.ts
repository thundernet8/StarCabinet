import {electron, app, BrowserWindow} from 'electron'
import path                           from 'path'
import fs                             from 'fs'
import url                            from 'url'
import createMainWindow               from './windows/main'
import createLoginWindow              from './windows/login'
import services                       from './services'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null

function createWindow () {
  if (win) return

  // Create the browser window.
  win = createLoginWindow()

  var packageConfigs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')))
  // Add React dev tools
  BrowserWindow.addDevToolsExtension(packageConfigs.reactDevTool)

  // Open the DevTools.
  if (process.env.NODE_ENV !== 'production') {
      win.webContents.on('devtools-opened', () => {
        setImmediate(() => {
          win.focus()
        })
      })
      win.webContents.openDevTools()
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  const page = win.webContents

  page.on('dom-ready', () => {
  // page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'))
    page.executeJavaScript(`document.body.className="platform_${process.platform}"`, false)
  })

  page.on('new-window', (e, url) => {
    e.preventDefault()
    electron.shell.openExternal(url) // open links external
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

services.register()
