import React from "react";
import classNames from "classnames";
import { Tooltip } from "antd";
import SCLogger from "../utils/logHelper";
import { RepoContributorsBarProps } from "../containers/repoContributorsBar";

const styles = require("../styles/main.less");

export default class RepoContributorsBar extends React.Component<RepoContributorsBarProps> {
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
            <div className={classNames("contributorsBar", styles.contributorsBar)}>{avatars}</div>
        );
    }
}
