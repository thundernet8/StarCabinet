import { observable, action } from "mobx";
import moment from "moment";

export default class GlobalStore {
    /**
     * Network status
     */
    @observable offline: boolean = false;
    @observable offlineTime: number = 0;

    @action
    setOffline = (offline: boolean) => {
        this.offline = offline;
        this.offlineTime = offline ? moment.now().valueOf() : 0;
    };
}
