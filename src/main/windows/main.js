import {shell, BrowserWindow}           from 'electron'
import path                             from 'path'
import url                              from 'url'

function createMainWindow (wins) {
    let win = new BrowserWindow({
        width: 1020,
        height: 640,
        titleBarStyle: 'hidden-inset',
        resizable: true,
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

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        wins.main = null
    })

    // Insert platform body class
    win.webContents.on('dom-ready', () => {
        win.webContents.executeJavaScript(`document.body.className="platform_${process.platform}"`, false)
    })

    // Open links external
    win.webContents.on('new-window', (e, url) => {
        e.preventDefault()
        shell.openExternal(url)
    })

    wins.main = win

    return win
}

export default createMainWindow
