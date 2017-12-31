import React from "react";
import * as EVENTS from "../../shared/events";
import * as SHAREDCONSTANTS from "../../shared/constants";
import { ipcRenderer } from "electron";
import { Input, Icon, Button, message } from "antd";
import classNames from "classnames";
import { LoginPageProps } from "../containers/loginPage";

const styles = require("./assets/styles/login.less");

message.config({
    top: 60,
    duration: 5
});

interface LoginPageState {
    submitting: boolean;
    username: string;
    password: string;
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    private userNameInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;

    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            username: this.props.credentials.username,
            password: this.props.credentials.password
        };
    }

    refUsernameInput = input => {
        this.userNameInput = input;
    };

    refPasswordInput = input => {
        this.passwordInput = input;
    };

    emitUsernameEmpty = () => {
        if (this.state.submitting) {
            return;
        }
        this.userNameInput.focus();
        this.setState({
            username: ""
        });
    };

    emitPasswordEmpty = () => {
        if (this.state.submitting) {
            return;
        }
        this.passwordInput.focus();
        this.setState({
            password: ""
        });
    };

    onChangeUserName = e => {
        this.setState({
            username: e.target.value
        });
    };

    onChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    };

    enterSubmit = () => {
        if (this.state.submitting) {
            return;
        }
        this.setState({ submitting: true });
        this.props.onRequestLogin(
            {
                username: this.state.username,
                password: this.state.password
            },
            this.showLoginMsg
        );
    };

    showLoginMsg = (success, msg) => {
        if (success) {
            message.success(msg);
        } else {
            message.info(msg);
        }
    };

    closeLoginWindow() {
        ipcRenderer.sendSync(EVENTS.CLOSE_LOGIN, "");
    }

    componentWillMount() {
        this.props
            .onGetLocalCredentials(true)
            .then(msg => {
                this.showLoginMsg(true, msg);
            })
            .catch(() => {
                // this.showLoginMsg(false, err.message)
            });
    }

    componentWillReceiveProps(nextProps) {
        let newState = {
            username: nextProps.credentials.username,
            password: nextProps.credentials.password,
            submitting:
                !!nextProps.credentials.username &&
                !!nextProps.credentials.password &&
                nextProps.loginResult.success === null
        };

        this.setState(newState);
    }

    render() {
        const { submitting } = this.state;
        const { username, password } = this.state;
        const usernameSuffix = username ? (
            <Icon type="close-circle" onClick={this.emitUsernameEmpty} />
        ) : null;
        const passwordSuffix = password ? (
            <Icon type="close-circle" onClick={this.emitPasswordEmpty} />
        ) : null;
        const btnDisabled = !username || !password || username.length < 2 || password.length < 5;
        const avatar = this.props.loginResult.profile
            ? this.props.loginResult.profile.avatar_url
            : require("../assets/images/icon.png");
        return (
            <div className={classNames("loginWrapper", styles.wrapper)}>
                <header>
                    <div>{SHAREDCONSTANTS.APP}</div>
                    <span id="closeLogin" className={styles.close} onClick={this.closeLoginWindow}>
                        <i />
                        <i />
                    </span>
                </header>
                <div className={styles.logoWrapper}>
                    <img
                        key="logo"
                        className={classNames(styles.logo, "logo", "trans", {
                            [styles.logoLogged]: this.props.loginResult.success === true
                        })}
                        src={avatar}
                    />
                    {this.props.loginResult.success === true && (
                        <div className={classNames(styles.name, "name center fadeInDelay")}>
                            <span>{this.props.loginResult.profile.name}</span>
                        </div>
                    )}
                </div>
                {this.props.loginResult.success !== true && (
                    <div className={styles.loginBox}>
                        <div className="mt20">
                            <Input
                                size="large"
                                placeholder="Github UserName"
                                prefix={<Icon type="user" />}
                                suffix={usernameSuffix}
                                value={username}
                                onChange={this.onChangeUserName}
                                disabled={submitting}
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
                                onChange={this.onChangePassword}
                                disabled={submitting}
                                ref={this.refPasswordInput}
                            />
                        </div>
                        <div className="mt30">
                            <Button
                                className={styles.loginBtn}
                                size="large"
                                type="primary"
                                loading={submitting}
                                onClick={this.enterSubmit}
                                disabled={btnDisabled}
                            >
                                {submitting ? "" : "Login"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
