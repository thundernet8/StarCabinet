import { ipcMain } from "electron";
import * as EVENTS from "../../shared/events";
import * as CONSTANTS from "../../shared/constants";
const keytar = require("keytar");

const mainGetLocalCredentials = username => {
    return keytar.getPassword(CONSTANTS.APP, username).then(password => ({ username, password }));
};

const mainSaveCredentials = credentials => {
    return keytar.setPassword(CONSTANTS.APP, credentials.username, credentials.password);
};

const mainDeleteCredentials = username => {
    return keytar.deletePassword(CONSTANTS.APP, username);
};

const handleCredentialsEvents = () => {
    ipcMain.on(EVENTS.GET_LOCAL_CREDENTIALS, (event, username) => {
        mainGetLocalCredentials(username).then(credentials => {
            event.sender.send(EVENTS.GET_LOCAL_CREDENTIALS_REPLY, JSON.stringify(credentials));
        });
    });

    ipcMain.on(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, (event, arg) => {
        let credentials = JSON.parse(arg);
        mainSaveCredentials(credentials).then(() => {
            event.sender.send(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM_REPLY, "ok");
        });
    });

    ipcMain.on(EVENTS.DELETE_LOCAL_CREDENTIALS, (event, username) => {
        mainDeleteCredentials(username).then(result => {
            event.sender.send(EVENTS.DELETE_LOCAL_CREDENTIALS_REPLY, !!result);
        });
    });
};

export default handleCredentialsEvents;
