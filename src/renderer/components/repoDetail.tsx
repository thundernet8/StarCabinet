import React from "react";
import classNames from "classnames";
import { Icon, Tooltip } from "antd";
import RepoContributorsBar from "../containers/repoContributorsBar";
import RepoTagsBar from "../containers/repoTagsBar";
import RepoReadme from "../containers/repoReadme";
import { RepoDetailProps } from "../containers/repoDetail";

const styles = require("../styles/main.less");

export default class RepoDetail extends React.Component<RepoDetailProps> {
    render() {
        if (!this.props.selectedRepo) {
            return null;
        }
        const fullName = this.props.selectedRepo.fullName;
        const namePieces = fullName.split("/");
        let pushTime = new Date(this.props.selectedRepo.pushedAt);
        pushTime = pushTime.toLocaleDateString() + " " + pushTime.toLocaleTimeString();

        return (
            <div className={classNames("repoDetailInner", styles.repoDetailInner)}>
                <header>
                    <div className={styles.headtitle}>
                        <Icon type="home" />
                        <a
                            href={this.props.selectedRepo.htmlUrl.replace(fullName, namePieces[0])}
                            target="_blank"
                        >
                            {namePieces[0]}
                        </a>
                        <span>/</span>
                        <a href={this.props.selectedRepo.htmlUrl} target="_blank">
                            {namePieces[1]}
                        </a>
                    </div>
                    <div className={styles.repoMeta}>Latest Push: {pushTime}</div>
                    <RepoContributorsBar />
                    <RepoTagsBar />
                </header>
                <RepoReadme />
            </div>
        );
    }
}
