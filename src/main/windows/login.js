const {BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

// let injectStyle = '*{margin:0;padding:0;}'

function createLoginWindow () {
    let win = new BrowserWindow({
        width: 288,
        height: 400,
        titleBarStyle: 'hidden-inset',
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

    // let page = win.webContents
    // page.on('dom-ready', () => {
    //     page.insertCSS(injectStyle)
    // })

    return win
}

module.exports = createLoginWindow
