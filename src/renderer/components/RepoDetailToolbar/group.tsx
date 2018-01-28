import * as React from "react";
import ClassNames from "classnames";
import { Icon, Tooltip, Popover } from "antd";
import IRepo from "../../interface/IRepo";

// const CheckboxGroup = Checkbox.Group;

const styles = require("./styles/index.less");

interface RepoGroupToolProps {
    repo: IRepo;
}

interface RepoGroupToolState {
    visible: boolean;
    categorySelection: { label: string; value: string }[];
}

export default class RepoGroupTool extends React.Component<RepoGroupToolProps, RepoGroupToolState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            categorySelection: []
        };
    }

    submit = () => {
        this.setState({
            visible: false
        });
        // this.props.onUpdateRepoCategories(
        //     this.props.repo.id,
        //     this.state.categorySelection.map(item => parseInt(item, 10))
        // );
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    onSelectionChange = checkValues => {
        this.setState({
            categorySelection: checkValues
        });
    };

    queryCategories = _repoId => {
        // this.props.onGetCategoriesForRepo(repoId).then(categories => {
        //     this.setState({
        //         categorySelection: categories.map(category => category.id.toString())
        //     });
        // });
    };

    componentWillMount() {
        const repo = this.props.repo;
        if (repo && !repo._categories) {
            this.queryCategories(repo.id);
        }
    }

    render() {
        if (!this.props.repo) {
            return null;
        }

        const titleNode = (
            <div className={ClassNames("classifyPaneTitle", styles.classifyPaneTitle)}>
                <span>Choose Repo Categoires</span>
                {/* {this.props.categories &&
                    this.props.categories.length > 0 && <a onClick={this.submit}>SAVE</a>} */}
            </div>
        );

        // const catsSelectionOptions = this.props.categories.map(category => {
        //     return { label: category.name, value: category.id.toString() };
        // });

        // const catsSelectionOptions = [];

        const content = (
            <div
                className={ClassNames(
                    "repoClassifyToolInputWrap",
                    styles.repoClassifyToolInputWrap
                )}
            >
                {/* {!this.props.categories || this.props.categories.length === 0 ? (
                    <div>Please add some categories before choosing ones</div>
                ) : (
                    <CheckboxGroup
                        options={catsSelectionOptions}
                        value={this.state.categorySelection}
                        onChange={this.onSelectionChange}
                    />
                )} */}
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
                <Tooltip placement="bottom" title="Classify it">
                    <Icon type="folder" />
                </Tooltip>
            </Popover>
        );
    }
}
