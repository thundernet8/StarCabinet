import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { ipcRenderer } from "electron";
import { Input, Icon, Button, message } from "antd";
import IStore from "../../interface/IStore";
import * as EVENTS from "../../../shared/events";
import * as CONSTANTS from "../../../shared/constants";

message.config({
    top: 60,
    duration: 5
});

const styles = require("./styles/index.less");

interface LoginViewProps {
    store?: IStore;
}

interface LoginViewState {}

@inject("store")
@observer
export default class LoginView extends React.Component<LoginViewProps, LoginViewState> {
    private userNameInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;

    constructor(props) {
        super(props);
    }

    refUsernameInput = input => {
        this.userNameInput = input;
    };

    refPasswordInput = input => {
        this.passwordInput = input;
    };

    emitUsernameEmpty = () => {
        const store = this.props.store!.global;
        if (store.isRequestingSignin) {
            return;
        }
        this.userNameInput.focus();
        store.setUsername("");
    };

    emitPasswordEmpty = () => {
        const store = this.props.store!.global;
        if (store.isRequestingSignin) {
            return;
        }
        this.passwordInput.focus();
        store.setPassword("");
    };

    onInputUsername = e => {
        const store = this.props.store!.global;
        store.setUsername(e.target.value);
    };

    onInputPassword = e => {
        const store = this.props.store!.global;
        store.setPassword(e.target.value);
    };

    onSubmit = () => {
        const store = this.props.store!.global;
        if (store.isRequestingSignin) {
            return;
        }
        this.setState({ submitting: true });
        store
            .signIn(store.credentials)
            .then(profile => {
                if (profile) {
                    message.success("Login successfully");
                }
            })
            .catch(error => {
                message.error(error.message || error.toString());
            });
    };

    closeLoginWindow() {
        ipcRenderer.sendSync(EVENTS.CLOSE_LOGIN, "");
    }

    componentDidMount() {
        const store = this.props.store!.global;
        store
            .getLocalCredentials()
            .then(credentials => {
                if (credentials) {
                    return store.signIn(credentials);
                }
                return null as any;
            })
            .then(profile => {
                if (profile) {
                    message.success("Login successfully");
                }
            })
            .catch(error => {
                message.error(error.message || error.toString());
            });
    }

    render() {
        const { credentials, profile, isRequestingSignin } = this.props.store!.global;
        const username = credentials ? credentials.username : "";
        const password = credentials ? credentials.password : "";
        const usernameSuffix = username ? (
            <Icon type="close-circle" onClick={this.emitUsernameEmpty} />
        ) : null;
        const passwordSuffix = password ? (
            <Icon type="close-circle" onClick={this.emitPasswordEmpty} />
        ) : null;

        const btnDisabled = !username || !password || username.length < 2 || password.length < 5;
        const avatar = profile ? profile.avatar_url : require("../../assets/images/icon.png");

        return (
            <div className={ClassNames(styles.container, "loginWrapper")}>
                <header>
                    <div>{CONSTANTS.APP}</div>
                    <span id="closeLogin" className={styles.close} onClick={this.closeLoginWindow}>
                        <i />
                        <i />
                    </span>
                </header>
                <div className={styles.logoWrapper}>
                    <img
                        key="logo"
                        className={ClassNames(styles.logo, "logo", "trans", {
                            [styles.logoLogged]: !!profile
                        })}
                        src={avatar}
                    />
                    {profile && (
                        <div className={ClassNames(styles.name, "name center fadeInDelay")}>
                            <span>{profile.name}</span>
                        </div>
                    )}
                </div>
                {!profile && (
                    <div className={styles.loginBox}>
                        <div className="mt20">
                            <Input
                                size="large"
                                placeholder="Github UserName"
                                prefix={<Icon type="user" />}
                                suffix={usernameSuffix}
                                value={username}
                                onChange={this.onInputUsername}
                                disabled={isRequestingSignin}
                                ref={this.refUsernameInput}
                            />
                        </div>
                        <div className="mt10">
                            <Input
                                size="large"
                                type="password"
                                placeholder="Access Token"
                                prefix={<Icon type="lock" />}
                                suffix={passwordSuffix}
                                value={password}
                                onChange={this.onInputPassword}
                                onPressEnter={this.onSubmit}
                                disabled={isRequestingSignin}
                                ref={this.refPasswordInput}
                            />
                        </div>
                        <div className="mt30">
                            <Button
                                className={styles.loginBtn}
                                size="large"
                                type="primary"
                                loading={isRequestingSignin}
                                onClick={this.onSubmit}
                                disabled={btnDisabled}
                            >
                                {isRequestingSignin ? "" : "Login"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
