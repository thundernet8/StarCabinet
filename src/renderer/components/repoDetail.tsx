import React from "react";
import classNames from "classnames";
import { Icon } from "antd";
import * as moment from "moment";
import RepoContributorsBar from "../containers/repoContributorsBar";
import RepoTagsBar from "../containers/repoTagsBar";
import RepoReadme from "../containers/repoReadme";
import { RepoDetailProps } from "../containers/repoDetail";

const styles = require("../assets/styles/main.less");

export default class RepoDetail extends React.Component<RepoDetailProps> {
    render() {
        if (!this.props.selectedRepo) {
            return null;
        }
        const fullName = this.props.selectedRepo.fullName;
        const namePieces = fullName.split("/");
        const pushTime = moment(this.props.selectedRepo.pushedAt).format("YYYY-MM-DD HH:mm");

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
