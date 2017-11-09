import { ipcMain } from "electron";
import * as EVENTS from "../../shared/events";
import * as CONSTANTS from "../../shared/constants";
const keytar = require("keytar");

const mainGetLocalCredentials = username => {
    let password = keytar.getPassword(CONSTANTS.APP, username);
    return {
        username,
        password
    };
};

const mainSaveCredentials = credentials => {
    // return keytar.addPassword(CONSTANTS.APP, credentials.username, credentials.password)
    return keytar.replacePassword(
        CONSTANTS.APP,
        credentials.username,
        credentials.password
    );
};

const mainDeleteCredentials = username => {
    return keytar.deletePassword(CONSTANTS.APP, username);
};

const handleCredentialsEvents = () => {
    ipcMain.on(EVENTS.GET_LOCAL_CREDENTIALS, (event, username) => {
        let credentials = mainGetLocalCredentials(username);
        event.sender.send(
            EVENTS.GET_LOCAL_CREDENTIALS_REPLY,
            JSON.stringify(credentials)
        );
    });

    ipcMain.on(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM, (event, arg) => {
        let credentials = JSON.parse(arg);
        let result = mainSaveCredentials(credentials);
        event.sender.send(EVENTS.SAVE_CREDENTIALS_TO_SYSTEM_REPLY, result);
    });

    ipcMain.on(EVENTS.DELETE_LOCAL_CREDENTIALS, (event, username) => {
        let result = mainDeleteCredentials(username);
        event.sender.send(EVENTS.DELETE_LOCAL_CREDENTIALS_REPLY, !!result);
    });
};

export default handleCredentialsEvents;
