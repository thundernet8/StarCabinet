import { observable, action } from "mobx";
import moment from "moment";
import Authentication from "../utils/authentication";
import { ICredentialsState } from "../interface/IAccount";
import IProfile from "../interface/IProfile";
import logger from "../utils/logger";

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

    /**
     * Login
     */
    @observable credentials: ICredentialsState;

    @observable profile: IProfile;

    @observable isRequestingSignin: boolean = false;

    @action
    setCredentials = (credentials: ICredentialsState) => {
        this.credentials = credentials;
    };

    @action
    setUsername = (username: string) => {
        let { credentials } = this;
        if (!credentials) {
            credentials = {
                username,
                password: ""
            };
        } else {
            credentials.username = username;
        }
        this.credentials = Object.assign({}, credentials);
    };

    @action
    setPassword = (password: string) => {
        let { credentials } = this;
        if (!credentials) {
            credentials = {
                username: "",
                password
            };
        } else {
            credentials.password = password;
        }
        this.credentials = Object.assign({}, credentials);
    };

    @action
    getLocalCredentials = () => {
        return Authentication.getLocalCredentials()
            .then(credentials => {
                this.credentials = credentials;
                return credentials;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
                throw error;
            });
    };

    @action
    signIn = (credentials: ICredentialsState) => {
        if (this.isRequestingSignin) {
            return Promise.reject(false);
        }
        this.isRequestingSignin = true;
        return Authentication.signInApp(credentials)
            .then(profile => {
                this.profile = profile;
                return profile;
            })
            .finally(() => {
                this.isRequestingSignin = false;
            });
    };
}
