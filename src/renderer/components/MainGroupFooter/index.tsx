import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Icon, Modal, Input, Alert } from "antd";
import IStore from "../../interface/IStore";
import * as EVENTS from "../../../shared/events";
import { ipcRenderer } from "electron";

const styles = require("./styles/index.less");

interface MainGroupFooterProps {
    store?: IStore;
}

interface MainGroupFooterState {
    modalVisible: boolean;
    error: Error | string | null;
    categoryName: string;
    submitting: boolean;
}

@inject("store")
@observer
export default class MainGroupFooter extends React.Component<
    MainGroupFooterProps,
    MainGroupFooterState
> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            error: null,
            categoryName: "",
            submitting: false
        };
    }

    showAddCatDialog = () => {
        if (this.state.modalVisible) {
            return;
        }
        this.setState({
            modalVisible: true,
            error: null
        });
    };

    closeAddCategoryDialog = () => {
        this.setState({
            modalVisible: false,
            categoryName: ""
        });
    };

    onInputCategoryName = (e: any) => {
        this.setState({
            categoryName: e.target.value.trim()
        });
    };

    submitCategoryName = () => {
        const { categoryName } = this.state;
        if (!categoryName) {
            this.setState({
                error: "Please input category name"
            });
            return;
        }
        this.setState({
            submitting: true
        });

        const mainStore = this.props.store!.main;
        setTimeout(() => {
            mainStore
                .addNewCategory(categoryName)
                .then(() => {
                    this.setState({
                        submitting: false,
                        modalVisible: false,
                        categoryName: ""
                    });
                })
                .catch(error => {
                    this.setState({
                        submitting: false,
                        error
                    });
                });
        }, 2000);
    };

    clearError = () => {
        this.setState({
            error: null
        });
    };

    openSettingWindow = () => {
        ipcRenderer.send(EVENTS.OPEN_SETTING_WIN, "");
    };

    render() {
        const { categoryName } = this.state;

        return (
            <div className={ClassNames("groupFooter", styles.groupFooter)}>
                <Icon
                    className={ClassNames("settingBtn", styles.settingBtn)}
                    type="setting"
                    onClick={this.openSettingWindow}
                />
                <Icon
                    className={ClassNames("addCatBtn", styles.addCatBtn)}
                    type="plus"
                    onClick={this.showAddCatDialog}
                />
                <Modal
                    title="Add a new category"
                    wrapClassName="vertical-center-modal"
                    width={275}
                    visible={this.state.modalVisible}
                    closable={false}
                    okText="OK"
                    cancelText="Cancel"
                    confirmLoading={this.state.submitting}
                    maskClosable={false}
                    onOk={this.submitCategoryName}
                    onCancel={this.closeAddCategoryDialog}
                >
                    {this.state.error && (
                        <Alert
                            message={this.state.error}
                            closable
                            showIcon
                            onClose={this.clearError}
                        />
                    )}
                    <Input
                        placeholder="category name"
                        size="large"
                        disabled={this.state.submitting}
                        onChange={this.onInputCategoryName}
                        value={categoryName}
                    />
                </Modal>
            </div>
        );
    }
}
