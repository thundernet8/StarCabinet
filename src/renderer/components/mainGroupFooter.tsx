import React from "react";
import classNames from "classnames";
import { Icon, Modal, Input, Alert } from "antd";
import * as EVENTS from "../../shared/events";
import { ipcRenderer } from "electron";
import { MainGroupFooterProps } from "../containers/mainGroupFooter";

const styles = require("../assets/styles/main.less");

interface MainGroupFooterState {
    modalVisible: boolean;
    submitting: boolean;
    error: string | null;
    categoryName: string;
}

export default class MainGroupFooter extends React.Component<
    MainGroupFooterProps,
    MainGroupFooterState
> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            submitting: false,
            error: null,
            categoryName: ""
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

    closeAddCatDialog = () => {
        this.setState({
            modalVisible: false
        });
    };

    onInputCategoryName = (e: any) => {
        this.setState({
            categoryName: e.target.value.trim()
        });
    };

    submitCatName = () => {
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
        setTimeout(() => {
            this.props.onAddNewCategory(categoryName);
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.catAdd) {
            const catAddResult = nextProps.catAdd;
            if (catAddResult.success) {
                this.setState({
                    modalVisible: false,
                    submitting: false,
                    categoryName: ""
                });
            } else if (catAddResult.error) {
                this.setState({
                    error: catAddResult.error.message,
                    submitting: false
                });
            }
        }
    }

    render() {
        return (
            <div className={classNames("groupFooter", styles.groupFooter)}>
                <Icon
                    className={classNames("settingBtn", styles.settingBtn)}
                    type="setting"
                    onClick={this.openSettingWindow}
                />
                <Icon
                    className={classNames("addCatBtn", styles.addCatBtn)}
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
                    onOk={this.submitCatName}
                    onCancel={this.closeAddCatDialog}
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
                    />
                </Modal>
            </div>
        );
    }
}
