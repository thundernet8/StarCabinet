import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Icon } from "antd";
import moment from "moment";
import IStore from "../../interface/IStore";
import RepoContributorsBar from "./contributors";
import RepoTagsBar from "./tags";
import RepoReadme from "./readme";

const styles = require("./styles/index.less");

interface RepoDetailProps {
    store?: IStore;
}

interface RepoDetailState {}

@inject("store")
@observer
export default class RepoDetail extends React.Component<RepoDetailProps, RepoDetailState> {
    constructor(props) {
        super(props);
    }

    render() {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;
        if (!selectedRepo) {
            return null;
        }

        const { fullName, pushedAt, htmlUrl } = selectedRepo;
        const namePieces = fullName.split("/");
        const pushTime = moment(pushedAt).format("YYYY-MM-DD HH:mm");

        return (
            <div className={ClassNames("repoDetailInner", styles.repoDetailInner)}>
                <header>
                    <div className={styles.headtitle}>
                        <Icon type="home" />
                        <a href={htmlUrl.replace(fullName, namePieces[0])} target="_blank">
                            {namePieces[0]}
                        </a>
                        <span>/</span>
                        <a href={htmlUrl} target="_blank">
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
