const {electron, app, BrowserWindow} = require('electron')
const path = require('path')
const fs = require('fs')
const url = require('url')
const createMainWindow = require('./windows/main')
const createLoginWindow = require('./windows/login')
const services = require('./services')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = createLoginWindow()

  var packageConfigs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')))
  // Add React dev tools
  // BrowserWindow.addDevToolsExtension(packageConfigs.reactDevTool)

  // Open the DevTools.
  if (process.env.NODE_ENV !== 'production') {
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

  // page.on('dom-ready', () => {
  //   page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'))
  // })

  page.on('new-window', (e, url) => {
    e.preventDefault()
    electron.shell.openExternal(url) // 在外部浏览器打开链接
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
