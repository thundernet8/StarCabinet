import * as EVENTS from "../../shared/events";
import { ipcRenderer } from "electron";

export const quitElectronApp = () => {
    ipcRenderer.send(EVENTS.QUIT_APP);
};

export const restartElectronApp = () => {
    ipcRenderer.send(EVENTS.RESTART_APP);
};
