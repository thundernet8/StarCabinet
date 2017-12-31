import React from "react";
import { Link } from "react-router";
import * as EVENTS from "../../shared/events";
import * as SHAREDCONSTANTS from "../../shared/constants";
import { ipcRenderer } from "electron";
import { Upload, Icon, Button, message, Modal } from "antd";
import classNames from "classnames";
import dbName from "../utils/dbName";
import { starsDataExportHandler, starsDataImportHandler } from "../utils/data";
import Authentication from "../utils/authentication";
import { quitElectronApp, restartElectronApp } from "../utils/electronApp";
import { SettingPageProps } from "../containers/settingPage";

const defaultAvatar = require("../assets/images/avatar-default.png");

const styles = require("../styles/setting.less");

export default class SettingPage extends React.Component<SettingPageProps> {
    state = {
        importing: false,
        exporting: false,
        restarModalVisible: false,
        quitModalVisible: false
    };

    cancelModal = () => {
        this.setState({
            restarModalVisible: false,
            quitModalVisible: false
        });
    };

    getAvatarUrl = () => {
        if (!this.props.profile || !this.props.profile.avatarUrl) {
            return defaultAvatar;
        }
        return this.props.profile.avatarUrl;
    };

    showQuitWarning = () => {
        this.setState({
            quitModalVisible: true
        });
    };

    signout = () => {
        Authentication.signOutApp();
        setTimeout(() => {
            quitElectronApp();
        }, 1000);
    };

    restart = () => {
        restartElectronApp();
    };

    importData = () => {
        if (this.state.importing) {
            return false;
        }
        starsDataImportHandler(this.props.db)
            .then(() => {
                message.success("Data import successfully");
                this.setState({
                    importing: false
                });
                setTimeout(() => {
                    this.setState({
                        restarModalVisible: true
                    });
                }, 2000);
            })
            .catch(err => {
                message.error(err.message);
                console.log(err);
                this.setState({
                    importing: false
                });
            });
    };

    exportData = () => {
        if (this.state.exporting) {
            return false;
        }
        starsDataExportHandler(this.props.db)
            .then(() => {
                message.success("Data export successfully");
                this.setState({
                    exporting: false
                });
            })
            .catch(err => {
                message.error(err.message);
                this.setState({
                    exporting: false
                });
            });
    };

    openFeedback = () => {
        window.open("https://github.com/thundernet8/StarCabinet/issues", "_blank");
    };

    componentWillMount() {
        this.props
            .onGetLocalCredentials()
            .then(credentials => {
                return this.props.onGetRxDB(dbName(credentials.username));
            })
            .then(() => {
                this.props.onGetMyProfile();
            });
    }

    componentWillReceiveProps(nextProps) {}

    render() {
        return (
            <div className={classNames("settingWrapper", styles.settingWrapper)}>
                <header>
                    <div>SETTING</div>
                </header>
                <section className={classNames("settingBody", styles.settingBody)}>
                    <div
                        className={classNames(
                            "settingRow",
                            styles.settingRow,
                            styles.accountSetting
                        )}
                    >
                        <img className={styles.accountAvatar} src={this.getAvatarUrl()} />
                        {this.props.profile && (
                            <span className={styles.accountName}>{this.props.profile.name}</span>
                        )}
                        <Button type="default" size="default" onClick={this.showQuitWarning}>
                            SignOut
                        </Button>
                    </div>
                    <div className={classNames("settingRow", styles.settingRow, styles.contact)}>
                        <span>Backup: </span>
                        <Button onClick={this.exportData}>
                            <Icon type="upload" /> Click to Export
                        </Button>
                    </div>
                    <div className={classNames("settingRow", styles.settingRow, styles.contact)}>
                        <span>Restore: </span>
                        <Button onClick={this.importData}>
                            <Icon type="download" /> Click to Import
                        </Button>
                    </div>
                    <div className={classNames("settingRow", styles.settingRow, styles.contact)}>
                        <span>Feedback: </span>
                        <Button type="default" size="default" onClick={this.openFeedback}>
                            Submit Feedback
                        </Button>
                    </div>
                </section>
                <footer>&copy; 2017-{`${new Date().getFullYear()} StarCabinet`}</footer>
                <Modal
                    title="Remind"
                    visible={this.state.quitModalVisible}
                    onOk={this.signout}
                    onCancel={this.cancelModal}
                    okText="OK"
                    cancelText="Cancel"
                    maskClosable={false}
                    closable={false}
                >
                    App will exit after signing out
                </Modal>
                <Modal
                    title="Remind"
                    visible={this.state.restarModalVisible}
                    onOk={this.restart}
                    onCancel={this.cancelModal}
                    okText="OK"
                    cancelText="Cancel"
                    maskClosable={false}
                    closable={false}
                >
                    App need restart to apply the new data
                </Modal>
            </div>
        );
    }
}
