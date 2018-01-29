import * as React from "react";
import ClassNames from "classnames";
import { Spin } from "antd";
import ReactMarkdown from "react-markdown";
import IRepo from "../../interface/IRepo";

require("github-markdown-css");

const styles = require("./styles/index.less");

interface RepoReadmeProps {
    repo: IRepo;
    onFetchRepoReadMe: (repo: IRepo) => void;
}

interface RepoReadmeState {}

export default class RepoReadme extends React.Component<RepoReadmeProps, RepoReadmeState> {
    constructor(props) {
        super(props);
    }

    transformImageUri = url => {
        const { repo } = this.props;

        const regex = /http(s?):\/\//i;
        if (!regex.test(url)) {
            if (repo) {
                let prefix =
                    "https://raw.githubusercontent.com/" + repo.fullName + "/" + repo.defaultBranch;
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
        const { repo } = this.props;

        if (repo) {
            let prefix =
                "https://raw.githubusercontent.com/" +
                repo.fullName +
                "/" +
                repo.defaultBranch +
                "/";
            return content.replace(/(<img(.*?)src=")(?!http:\/\/)(.*?)"/g, `$1${prefix}$3"`);
        }
    };

    shouldComponentUpdate(nextProps) {
        if (
            !this.props.repo ||
            nextProps.repo.id !== this.props.repo.id ||
            nextProps.repo.readme !== this.props.repo.readme
        ) {
            return true;
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.repo || nextProps.repo.id !== this.props.repo.id) {
            this.props.onFetchRepoReadMe(nextProps.repo);
        }
    }

    componentWillMount() {
        const { repo } = this.props;

        if (repo) {
            this.props.onFetchRepoReadMe(repo);
        }
    }

    render() {
        const { repo } = this.props;

        if (!repo) {
            return null;
        } else if (!repo.readme) {
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
                        source={this.replaceImageSrc(repo.readme)}
                        transformImageUri={this.transformImageUri}
                    />
                </div>
            </div>
        );
    }
}
