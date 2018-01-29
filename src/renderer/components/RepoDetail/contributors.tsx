import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Tooltip } from "antd";
import IStore from "../../interface/IStore";

const styles = require("./styles/index.less");

interface RepoContributorsBarProps {
    store?: IStore;
}

interface RepoContributorsBarState {}

@inject("store")
@observer
export default class RepoContributorsBar extends React.Component<
    RepoContributorsBarProps,
    RepoContributorsBarState
> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (selectedRepo) {
            mainStore.onFetchRepoContributors(selectedRepo);
            mainStore.onGetSelectRepoContributors(selectedRepo.id);
        }
    }

    render() {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (!selectedRepo || !selectedRepo._contributors) {
            return null;
        }

        const avatars = selectedRepo._contributors.map(contributor => {
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
