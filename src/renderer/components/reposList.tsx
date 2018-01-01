import React from "react";
import classNames from "classnames";
import RepoItem from "../components/repoListItem";
import { ReposListProps } from "../containers/reposList";

const styles = require("../assets/styles/main.less");

// repos list wrapper
export default class ReposList extends React.Component<ReposListProps> {
    render() {
        const { repos } = this.props;
        const repoItems = Object.keys(repos)
            .map(key => repos[key])
            .map(repo => (
                <RepoItem
                    key={repo.id}
                    repo={repo}
                    selectedRepo={this.props.selectedRepo}
                    onSelectRepo={this.props.onSelectRepo}
                    onRateRepo={this.props.onRateRepo}
                />
            ));
        return (
            <div className={classNames("reposListWrapper", styles.reposListWrapper)}>
                {repoItems}
            </div>
        );
    }
}
