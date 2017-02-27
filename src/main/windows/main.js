import {electron, BrowserWindow}        from 'electron'
import path                             from 'path'
import url                              from 'url'

function createMainWindow () {
    let win = new BrowserWindow({
        width: 960,
        height: 640,
        titleBarStyle: 'hidden-inset',
        resizable: false,
        frame: true // Specify false to create a Frameless Window. Default is true.
    })

    win.setMenu(null)

    win.loadURL(url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    if (process.env.NODE_ENV === 'development') {
        win.webContents.on('devtools-opened', () => {
          setImmediate(() => {
            win.focus()
          })
        })
        win.webContents.openDevTools()
    }
    // Insert platform body class
    win.webContents.on('dom-ready', () => {
      win.webContents.executeJavaScript(`document.body.className="platform_${process.platform}"`, false)
    })

    // Open links external
    win.webContents.on('new-window', (e, url) => {
        e.preventDefault()
        electron.shell.openExternal(url)
    })

    return win
}

export default createMainWindow
