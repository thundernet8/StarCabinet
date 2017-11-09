import * as EVENTS from "../../shared/events";
import { ipcRenderer } from "electron";
import Promise from "bluebird";

export const starsDataExportHandler = db => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(EVENTS.SHOW_CHOOSE_DIRECTORY_DIALOG);
        ipcRenderer.once(
            EVENTS.SHOW_CHOOSE_DIRECTORY_DIALOG_REPLG,
            (event, path) => {
                if (!path) {
                    reject(new Error("save path is empty"));
                }
                db
                    .dump()
                    .then(data => {
                        const filePath = path + "/" + db.name + ".json";
                        ipcRenderer.send(
                            EVENTS.EXPORT_STARS_DATA,
                            JSON.stringify({
                                path: filePath,
                                data: JSON.stringify(data)
                            })
                        );
                        ipcRenderer.once(
                            EVENTS.EXPORT_STARS_DATA_SUCCESS_REPLY,
                            () => {
                                resolve("data export successfully");
                            }
                        );
                        ipcRenderer.once(
                            EVENTS.EXPORT_STARS_DATA_FAIL_REPLY,
                            () => {
                                reject(new Error("data export failed"));
                            }
                        );
                    })
                    .catch(err => {
                        reject(new Error(err));
                    });
            }
        );
    });
};

export const starsDataImportHandler = db => {
    return new Promise((resolve, reject) => {
        ipcRenderer.send(EVENTS.SHOW_CHOOSE_FILE_DIALOG);
        ipcRenderer.once(EVENTS.SENT_IMPORT_STARS_DATA, (event, data) => {
            if (!data) {
                reject(new Error("file is empty"));
            }

            // clear current db first
            Promise.all([
                db.repos.find().remove(),
                db.authors.find().remove(),
                db.me.find().remove(),
                db.tags.find().remove(),
                db.categories.find().remove(),
                db.languages.find().remove(),
                db.settings.find().remove()
            ])
                .then(() => {
                    return db.importDump(JSON.parse(data));
                })
                .then(data => {
                    resolve("data import successfully");
                })
                .catch(err => {
                    reject(new Error(err));
                });
        });
        ipcRenderer.once(EVENTS.READ_FILE_FAILED, () => {
            reject(new Error("read file failed"));
        });
    });
};
