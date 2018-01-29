import * as React from "react";
import { observer, inject } from "mobx-react";
import { Tooltip, Tag, Input, Button } from "antd";
import IStore from "../../interface/IStore";

const styles = require("./styles/index.less");

interface RepoTagsBarProps {
    store?: IStore;
}

interface RepoTagsBarState {
    inputVisible: boolean;
    inputValue: string;
}

@inject("store")
@observer
export default class RepoTagsBar extends React.Component<RepoTagsBarProps, RepoTagsBarState> {
    private input: HTMLInputElement;

    constructor(props) {
        super(props);
        this.state = {
            inputVisible: false,
            inputValue: ""
        };
    }

    handleClose = removedTag => {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;
        if (selectedRepo) {
            // remove tag in db
            mainStore.onRemoveTagForRepo(selectedRepo.id, removedTag);
        }
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value.trim() });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;
        let tags =
            selectedRepo && selectedRepo._tags ? selectedRepo._tags.map(tag => tag.name) : [];
        if (inputValue && !tags.includes(inputValue)) {
            tags = [...tags, inputValue];
            // save new tag in db
            if (selectedRepo) {
                mainStore.onAddTagForRepo(selectedRepo.id, inputValue);
            }
        }
        this.setState({
            inputVisible: false,
            inputValue: ""
        });
    };

    saveInputRef = input => {
        this.input = input;
    };

    queryTags = repoId => {
        const mainStore = this.props.store!.main;
        mainStore.onGetTagsForRepo(repoId);
    };

    componentWillMount() {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;
        if (selectedRepo && !selectedRepo._tags) {
            this.queryTags(selectedRepo.id);
        }
    }

    render() {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;
        const tags =
            selectedRepo && selectedRepo._tags ? selectedRepo._tags.map(tag => tag.name) : [];

        const { inputVisible, inputValue } = this.state;
        return (
            <div className={styles.repoTags}>
                {/* <Icon type="tags"/> */}
                {tags.map(tag => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag
                            key={tag}
                            color="#3498db"
                            closable
                            afterClose={this.handleClose.bind(this, tag)}
                        >
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Button size="small" type="dashed" onClick={this.showInput}>
                        + New Tag
                    </Button>
                )}
            </div>
        );
    }
}
