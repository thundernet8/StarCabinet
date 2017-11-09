import { app, Menu, BrowserWindow } from "electron";

const menuTemplate = [
    {
        label: "Application",
        submenu: [
            {
                label: "About StarCabinet",
                selector: "orderFrontStandardAboutPanel:"
            },
            { type: "separator" },
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: function() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            {
                label: "Redo",
                accelerator: "Shift+CmdOrCtrl+Z",
                selector: "redo:"
            },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            {
                label: "Select All",
                accelerator: "CmdOrCtrl+A",
                selector: "selectAll:"
            }
        ]
    },
    {
        label: "View",
        submenu: [
            {
                label: "Open DevTools",
                accelerator: "Command+D",
                click: function() {
                    BrowserWindow.getFocusedWindow().webContents.openDevTools();
                }
            }
        ]
    }
];

export const setAppMenu = () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
};
