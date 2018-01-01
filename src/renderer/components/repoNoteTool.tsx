import React from "react";
import classNames from "classnames";
import { Icon, Tooltip, Popover, Input } from "antd";
import IRepo from "../interface/IRepo";

const styles = require("../assets/styles/main.less");

interface RepoNoteToolProps {
    repo: IRepo | null;
    updateNote: (id: number, note: string) => void;
}

export default class RepoNoteTool extends React.Component<RepoNoteToolProps> {
    state = {
        visible: false,
        note: ""
    };

    submit = () => {
        this.setState({
            visible: false
        });
        const { repo } = this.props;
        if (repo) {
            this.props.updateNote(repo.id, this.state.note);
        }
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
            <div className={classNames("repoNoteToolInputWrap", styles.repoNoteToolInputWrap)}>
                <Input.TextArea rows={5} value={this.state.note} onChange={this.inputValueChange} />
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
