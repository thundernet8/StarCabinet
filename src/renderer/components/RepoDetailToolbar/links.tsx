import * as React from "react";
import ClassNames from "classnames";
import { Icon, Tooltip, Popover, Input } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import IRepo from "../../interface/IRepo";

const styles = require("./styles/index.less");

interface RepoLinksToolProps {
    repo: IRepo;
}

interface RepoLinksToolState {
    visible: boolean;
    copied: boolean;
}

export default class RepoLinksTool extends React.Component<RepoLinksToolProps, RepoLinksToolState> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            copied: false
        };
    }

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    notifyCopied = () => {
        this.setState({
            copied: true
        });

        setTimeout(() => {
            this.setState({
                copied: false
            });
        }, 1500);
    };

    render() {
        if (!this.props.repo) {
            return null;
        }
        const clipboard = value => (
            <CopyToClipboard text={value} onCopy={this.notifyCopied}>
                <Icon type="copy" />
            </CopyToClipboard>
        );

        const titleNode = (
            <div className={ClassNames("linksPaneTitle", styles.linksPaneTitle)}>
                <span>Repo Clone Links</span>
                {this.state.copied && <a>Copied !</a>}
            </div>
        );

        const content = (
            <div className={ClassNames("repoLinksToolInputWrap", styles.repoLinksToolInputWrap)}>
                <Input
                    addonBefore="SSH"
                    addonAfter={clipboard(this.props.repo.sshUrl)}
                    value={this.props.repo.sshUrl}
                    readOnly
                />
                <Input
                    addonBefore="HTTPS"
                    addonAfter={clipboard(this.props.repo.cloneUrl)}
                    value={this.props.repo.cloneUrl}
                    readOnly
                />
                <Input
                    addonBefore="SVN"
                    addonAfter={clipboard(this.props.repo.svnUrl)}
                    value={this.props.repo.svnUrl}
                    readOnly
                />
            </div>
        );
        return (
            <Popover
                content={content}
                title={titleNode}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Tooltip placement="bottom" title="Repository links">
                    <Icon type="link" />
                </Tooltip>
            </Popover>
        );
    }
}
