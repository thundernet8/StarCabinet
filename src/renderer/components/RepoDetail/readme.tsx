import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Spin } from "antd";
import ReactMarkdown from "react-markdown";
import IStore from "../../interface/IStore";

require("github-markdown-css");

const styles = require("./styles/index.less");

interface RepoReadmeProps {
    store?: IStore;
}

interface RepoReadmeState {}

@inject("store")
@observer
export default class RepoReadme extends React.Component<RepoReadmeProps, RepoReadmeState> {
    constructor(props) {
        super(props);
    }

    transformImageUri = url => {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        const regex = /http(s?):\/\//i;
        if (!regex.test(url)) {
            if (selectedRepo) {
                let prefix =
                    "https://raw.githubusercontent.com/" +
                    selectedRepo.fullName +
                    "/" +
                    selectedRepo.defaultBranch;
                if (url.indexOf(".") !== 0) {
                    prefix += "/";
                }
                return prefix + url;
            }
        }
        return url;
    };

    // some readme markdown files includes html img tags
    // and also for relative src should be replaced
    replaceImageSrc = content => {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (selectedRepo) {
            let prefix =
                "https://raw.githubusercontent.com/" +
                selectedRepo.fullName +
                "/" +
                selectedRepo.defaultBranch +
                "/";
            return content.replace(/(<img(.*?)src=")(?!http:\/\/)(.*?)"/g, `$1${prefix}$3"`);
        }
    };

    componentWillMount() {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (selectedRepo) {
            // mainStore.onFetchRepoReadMe(selectedRepo);
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (
        //     !nextProps._hotChange &&
        //     this.props.selectedRepo &&
        //     nextProps.selectedRepo &&
        //     nextProps.selectedRepo.readme === "" &&
        //     nextProps.selectedRepo.id !== this.props.selectedRepo.id
        // ) {
        //     this.props.onFetchRepoReadMe(nextProps.selectedRepo);
        // }
    }

    render() {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (!selectedRepo) {
            return null;
        } else if (!selectedRepo.readme) {
            return (
                <div className={ClassNames("repoReadMeWrap", styles.repoReadMeWrap)}>
                    <div className={ClassNames(styles.repoReadmeLoading)}>
                        <Spin />
                    </div>
                </div>
            );
        }
        return (
            <div className={ClassNames("repoReadMeWrap", styles.repoReadMeWrap)}>
                <div
                    className={ClassNames(
                        "repoReadme markdown-body animated fadeInUp",
                        styles.repoReadme
                    )}
                >
                    <ReactMarkdown
                        source={this.replaceImageSrc(selectedRepo.readme)}
                        transformImageUri={this.transformImageUri}
                    />
                </div>
            </div>
        );
    }
}
