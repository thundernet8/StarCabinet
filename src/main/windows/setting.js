import { shell, BrowserWindow } from "electron";
import path from "path";
import url from "url";
import fs from "fs";

function createSettingWindow(wins) {
    let win = new BrowserWindow({
        width: 280,
        height: 350,
        titleBarStyle: "hidden-inset",
        resizable: false,
        frame: true,
        transparent: true
    });

    win.setMenu(null);

    win.loadURL(
        url.format({
            pathname: path.resolve(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
            hash: "setting"
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
        wins.setting = null;
    });

    let page = win.webContents;

    page.on("dom-ready", () => {
        // page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'))
        page.executeJavaScript(
            `document.body.className="platform_${process.platform}"`,
            false
        );
    });

    // Open links external
    page.on("new-window", (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
    });

    wins.setting = win;

    return win;
}

export default createSettingWindow;
