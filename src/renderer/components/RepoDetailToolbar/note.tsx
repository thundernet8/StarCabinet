import * as React from "react";
import ClassNames from "classnames";
import { Icon, Tooltip, Popover, Input } from "antd";
import IRepo from "../../interface/IRepo";

const styles = require("./styles/index.less");

interface RepoNoteToolProps {
    repo: IRepo;
    updateNote: (note: string) => void;
}

interface RepoNoteToolState {
    visible: boolean;
    note: string;
}

export default class RepoNoteTool extends React.Component<RepoNoteToolProps, RepoNoteToolState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            note: ""
        };
    }

    submit = () => {
        this.setState({
            visible: false
        });
        const { repo } = this.props;
        if (repo) {
            this.props.updateNote(this.state.note);
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

        console.log("Note component repo: ", this.props.repo);

        const titleNode = (
            <div className={ClassNames("notePaneTitle", styles.notePaneTitle)}>
                <span>Add Your Notes</span>
                <a onClick={this.submit}>SAVE</a>
            </div>
        );
        const content = (
            <div className={ClassNames("repoNoteToolInputWrap", styles.repoNoteToolInputWrap)}>
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
