import {BrowserWindow}        from 'electron'
import path                   from 'path'
import url                    from 'url'
import fs                     from 'fs'

let injectStyle = 'body{background-color:transparent !important;}'

function createLoginWindow () {
    let win = new BrowserWindow({
        width: 288,
        height: 400,
        // titleBarStyle: 'hidden-inset',
        resizable: false,
        frame: false, // Specify false to create a Frameless Window. Default is true.
        transparent: true
    })

    win.setMenu(null)

    win.loadURL(url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
        hash: 'login'
    }))

    let page = win.webContents
    page.on('dom-ready', () => {
        page.insertCSS(injectStyle)
    })

    return win
}

module.exports = createLoginWindow
