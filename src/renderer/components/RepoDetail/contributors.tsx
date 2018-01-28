import * as React from "react";
import ClassNames from "classnames";
import { Tooltip } from "antd";

const styles = require("./styles/index.less");

interface RepoContributorsBarProps {}

interface RepoContributorsBarState {}

export default class RepoContributorsBar extends React.Component<
    RepoContributorsBarProps,
    RepoContributorsBarState
> {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedRepo && !nextProps.selectedRepo._contributors) {
            this.props.onFetchRepoContributors(nextProps.selectedRepo);
            this.props.onGetRepoContributors(nextProps.selectedRepo.id);
        }
    }

    componentWillMount() {
        if (this.props.selectedRepo) {
            this.props.onFetchRepoContributors(this.props.selectedRepo);
            this.props.onGetRepoContributors(this.props.selectedRepo.id);
        }
    }

    render() {
        if (!this.props.selectedRepo || !this.props.selectedRepo._contributors) {
            return null;
        }

        const avatars = this.props.selectedRepo._contributors.map(contributor => {
            return (
                <a key={contributor.id} href={contributor.htmlUrl} target="_blank">
                    <Tooltip placement="top" title={contributor.login}>
                        <img src={contributor.avatarUrl} />
                    </Tooltip>
                </a>
            );
        });

        return (
            <div className={ClassNames("contributorsBar", styles.contributorsBar)}>{avatars}</div>
        );
    }
}
