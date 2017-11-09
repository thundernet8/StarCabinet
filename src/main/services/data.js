import { ipcMain, BrowserWindow, dialog } from "electron";
import * as EVENTS from "../../shared/events";
import fs from "fs";

export const exportDataHandle = () => {
    ipcMain.on(EVENTS.SHOW_CHOOSE_DIRECTORY_DIALOG, event => {
        const currentWin = BrowserWindow.getFocusedWindow();
        const dialogOptions = {
            title: "Export Data To",
            // defaultPath
            properties: ["openDirectory"]
        };
        dialog.showOpenDialog(currentWin, dialogOptions, paths => {
            event.sender.send(
                EVENTS.SHOW_CHOOSE_DIRECTORY_DIALOG_REPLG,
                paths[0]
            );
        });
    });

    ipcMain.on(EVENTS.EXPORT_STARS_DATA, (event, arg) => {
        const { path, data } = JSON.parse(arg);
        fs.writeFile(path, data, err => {
            if (err) {
                event.sender.send(EVENTS.EXPORT_STARS_DATA_FAIL_REPLY);
            }
            event.sender.send(EVENTS.EXPORT_STARS_DATA_SUCCESS_REPLY);
        });
    });
};

export const importDataHandle = () => {
    ipcMain.on(EVENTS.SHOW_CHOOSE_FILE_DIALOG, event => {
        const currentWin = BrowserWindow.getFocusedWindow();
        const dialogOptions = {
            title: "Export Data To",
            // defaultPath
            properties: ["openFile"],
            filters: [
                { name: "All Files", extensions: ["*"] },
                { name: "JSON Files", extensions: ["js", "json"] }
            ]
        };
        dialog.showOpenDialog(currentWin, dialogOptions, paths => {
            fs.readFile(paths[0], "utf8", (err, data) => {
                if (err) {
                    event.sender.send(EVENTS.READ_FILE_FAILED);
                } else {
                    event.sender.send(EVENTS.SENT_IMPORT_STARS_DATA, data);
                }
            });
        });
    });

    ipcMain.on(EVENTS.EXPORT_STARS_DATA, (event, arg) => {
        const { path, data } = JSON.parse(arg);
        fs.writeFile(path, data, err => {
            if (err) {
                event.sender.send(EVENTS.EXPORT_STARS_DATA_FAIL_REPLY);
            }
            event.sender.send(EVENTS.EXPORT_STARS_DATA_SUCCESS_REPLY);
        });
    });
};
