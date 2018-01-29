import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import IStore from "../../interface/IStore";
import RepoListItem from "./item";

const styles = require("./styles/index.less");

interface ReposListProps {
    store?: IStore;
}

interface ReposListState {}

@inject("store")
@observer
export default class ReposList extends React.Component<ReposListProps, ReposListState> {
    constructor(props) {
        super(props);
    }

    render() {
        const mainStore = this.props.store!.main;
        const { pageRepos, selectedRepo } = mainStore;

        return (
            <div className={ClassNames("reposListWrapper", styles.reposListWrapper)}>
                {pageRepos.map(repo => (
                    <RepoListItem
                        key={repo.id}
                        repo={repo}
                        selectedRepo={selectedRepo}
                        onSelectRepo={mainStore.onSelectRepo}
                        onRateRepo={mainStore.onRateRepo}
                    />
                ))}
            </div>
        );
    }
}
