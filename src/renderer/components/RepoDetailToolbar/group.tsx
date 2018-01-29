import * as React from "react";
import ClassNames from "classnames";
import { Icon, Tooltip, Popover, Checkbox } from "antd";
import IRepo from "../../interface/IRepo";
import ICategory from "../../interface/ICategory";

const CheckboxGroup = Checkbox.Group;

const styles = require("./styles/index.less");

interface RepoGroupToolProps {
    repo: IRepo;
    categories: ICategory[];
    getCategories: (id: number) => void;
    updateRepoCategories: (id: number, categoryIds: number[]) => void;
}

interface RepoGroupToolState {
    visible: boolean;
    categorySelection: string[];
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
        this.props.updateRepoCategories(
            this.props.repo.id,
            this.state.categorySelection.map(item => parseInt(item, 10))
        );
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    onSelectionChange = checkValues => {
        this.setState({
            categorySelection: checkValues
        });
    };

    queryCategories = (id: number) => {
        this.props.getCategories(id);
    };

    componentWillMount() {
        const repo = this.props.repo;
        if (repo && !repo._categories) {
            this.queryCategories(repo.id);
        }
    }

    render() {
        const { repo, categories } = this.props;
        if (!repo) {
            return null;
        }

        const repoCategories = repo._categories || [];
        const categorySelection = repoCategories.map(category => category.id.toString());

        const titleNode = (
            <div className={ClassNames("classifyPaneTitle", styles.classifyPaneTitle)}>
                <span>Choose Repo Categoires</span>
                {categories && categories.length > 0 && <a onClick={this.submit}>SAVE</a>}
            </div>
        );

        const catsSelectionOptions = categories.map(category => {
            return { label: category.name, value: category.id.toString() };
        });

        const content = (
            <div
                className={ClassNames(
                    "repoClassifyToolInputWrap",
                    styles.repoClassifyToolInputWrap
                )}
            >
                {categories.length === 0 ? (
                    <div>Please add some categories before choosing ones</div>
                ) : (
                    <CheckboxGroup
                        options={catsSelectionOptions}
                        value={categorySelection}
                        onChange={this.onSelectionChange}
                    />
                )}
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
