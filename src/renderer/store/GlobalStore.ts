import { observable, action } from "mobx";
import moment from "moment";
import Authentication from "../utils/authentication";
import { ICredentialsState } from "../interface/IAccount";
import IProfile from "../interface/IProfile";
import logger from "../utils/logger";
import { RxDatabase } from "rxdb";
import DBHandler from "../rxdb/dbHandler";
import dbName from "../utils/dbName";
import * as Database from "../rxdb/database";
import * as CONSTANTS from "../constants";

export default class GlobalStore {
    /**
     * Local database
     */
    private _db: RxDatabase;

    public getDb() {
        if (this._db) {
            return Promise.resolve(this._db);
        }
        const username = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY);
        if (username) {
            return Database.get(dbName(username)).then(db => {
                this._db = db;
                return db;
            });
        } else {
            return Promise.reject("No db instance and credentials");
        }
    }

    /**
     * Restore data from rxdb
     */
    public restore() {
        if (this.profile) {
            return Promise.resolve(true);
        }
        return this.getDb().then(() => {
            return Promise.all([this.getLocalCredentials(), this.getLocalProfile()]).then(
                () => true
            );
        });
    }

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
                if (!this._db) {
                    return Database.get(dbName(credentials.username)).then(db => {
                        this._db = db;
                        return profile;
                    });
                }
                return profile;
            })
            .finally(() => {
                this.isRequestingSignin = false;
            });
    };

    /**
     * Get local profile
     */
    @action
    getLocalProfile = () => {
        const username = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_USERNAME_KEY);

        return new DBHandler(this._db)
            .initDB()
            .then(dbHandler => dbHandler.getProfile(username!))
            .then(profile => {
                this.profile = profile;
                return profile;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
            });
    };
}
