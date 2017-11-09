import React from "react";
import classNames from "classnames";
import styles from "../styles/main";
import { Icon, Tooltip, Popover, Button, message, Input } from "antd";

export default class RepoNoteTool extends React.Component {
    state = {
        visible: false,
        note: ""
    };

    submit = () => {
        this.setState({
            visible: false
        });
        this.props.updateNote(this.props.repo.id, this.state.note);
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    inputValueChange = e => {
        this.setState({
            note: e.target.value
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.repo) {
            this.setState({
                note: nextProps.repo.note
            });
        }
    }

    render() {
        if (!this.props.repo) {
            return null;
        }

        const titleNode = (
            <div className={classNames("notePaneTitle", styles.notePaneTitle)}>
                <span>Add Your Notes</span>
                <a onClick={this.submit}>SAVE</a>
            </div>
        );
        const content = (
            <div
                className={classNames(
                    "repoNoteToolInputWrap",
                    styles.repoNoteToolInputWrap
                )}
            >
                <Input
                    type="textarea"
                    rows={5}
                    value={this.state.note}
                    onChange={this.inputValueChange}
                />
            </div>
        );

        return (
            <Popover
                content={content}
                title={titleNode}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Tooltip placement="bottom" title="Add your notes">
                    <Icon type="edit" />
                </Tooltip>
            </Popover>
        );
    }
}
