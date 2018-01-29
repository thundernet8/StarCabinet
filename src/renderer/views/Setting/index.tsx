import * as React from "react";
import { observer, inject } from "mobx-react";
import { Icon, Button, message, Modal } from "antd";
import ClassNames from "classnames";
import { starsDataExportHandler, starsDataImportHandler } from "../../utils/data";
import Authentication from "../../utils/authentication";
import { quitElectronApp, restartElectronApp } from "../../utils/electronApp";
import IStore from "../../interface/IStore";

const defaultAvatar = require("../../assets/images/avatar-default.png");

const styles = require("./styles/index.less");

interface SettingViewProps {
    store?: IStore;
}

interface SettingViewState {
    importing: boolean;
    exporting: boolean;
    restarModalVisible: boolean;
    quitModalVisible: boolean;
}

@inject("store")
@observer
export default class SettingView extends React.Component<SettingViewProps, SettingViewState> {
    constructor(props) {
        super(props);
        this.state = {
            importing: false,
            exporting: false,
            restarModalVisible: false,
            quitModalVisible: false
        };
    }

    cancelModal = () => {
        this.setState({
            restarModalVisible: false,
            quitModalVisible: false
        });
    };

    getAvatarUrl = () => {
        const globalStore = this.props.store!.global;
        const { profile } = globalStore;

        if (!profile || !profile.avatarUrl) {
            return defaultAvatar;
        }
        return profile.avatarUrl;
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

        const globalStore = this.props.store!.global;

        globalStore
            .getDb()
            .then(db => starsDataImportHandler(db))
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

        const globalStore = this.props.store!.global;

        globalStore
            .getDb()
            .then(db => starsDataExportHandler(db))
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

    componentDidMount() {
        const globalStore = this.props.store!.global;
        globalStore.restore();
    }

    render() {
        const globalStore = this.props.store!.global;
        const { profile } = globalStore;

        return (
            <div className={ClassNames("settingWrapper", styles.settingWrapper)}>
                <header>
                    <div>SETTING</div>
                </header>
                <section className={ClassNames("settingBody", styles.settingBody)}>
                    <div
                        className={ClassNames(
                            "settingRow",
                            styles.settingRow,
                            styles.accountSetting
                        )}
                    >
                        <img className={styles.accountAvatar} src={this.getAvatarUrl()} />
                        {profile && <span className={styles.accountName}>{profile.name}</span>}
                        <Button type="primary" size="default" onClick={this.showQuitWarning}>
                            SignOut
                        </Button>
                    </div>
                    <div className={ClassNames("settingRow", styles.settingRow, styles.contact)}>
                        <span>Backup: </span>
                        <Button onClick={this.exportData}>
                            <Icon type="upload" /> Click to Export
                        </Button>
                    </div>
                    <div className={ClassNames("settingRow", styles.settingRow, styles.contact)}>
                        <span>Restore: </span>
                        <Button onClick={this.importData}>
                            <Icon type="download" /> Click to Import
                        </Button>
                    </div>
                    <div className={ClassNames("settingRow", styles.settingRow, styles.contact)}>
                        <span>Feedback: </span>
                        <Button type="primary" size="default" onClick={this.openFeedback}>
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
