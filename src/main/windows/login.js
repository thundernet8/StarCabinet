import { shell, BrowserWindow } from "electron";
import path from "path";
import url from "url";
import fs from "fs";

let injectStyle = "body{background-color:transparent !important;}";

function createLoginWindow(wins) {
    let win = new BrowserWindow({
        width: 288,
        height: 400,
        titleBarStyle: "hidden-inset",
        resizable: false,
        frame: process.platform === "darwin", // Specify false to create a Frameless Window. Default is true.
        transparent: true
    });

    // win.setMenu(null)

    win.loadURL(
        process.env.NODE_ENV === "development"
            ? "http://localhost:9001/#/login"
            : url.format({
                  pathname: path.resolve(__dirname, "index.html"),
                  protocol: "file:",
                  slashes: true,
                  hash: "/login"
              })
    );

    // Open the DevTools.
    if (process.env.NODE_ENV === "development") {
        win.webContents.on("devtools-opened", () => {
            setImmediate(() => {
                win.focus();
            });
        });
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        wins.login = null;
    });

    let page = win.webContents;

    page.on("dom-ready", () => {
        // page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'))
        page.executeJavaScript(`document.body.className="platform_${process.platform}"`, false);
        page.insertCSS(injectStyle);
    });

    // Open links external
    page.on("new-window", (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
    });

    wins.login = win;

    return win;
}

export default createLoginWindow;
