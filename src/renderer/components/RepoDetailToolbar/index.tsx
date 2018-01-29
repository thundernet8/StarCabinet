import * as React from "react";
import { observer, inject } from "mobx-react";
import ClassNames from "classnames";
import { Icon, Tooltip, message } from "antd";
import IStore from "../../interface/IStore";
import RepoGroupTool from "./group";
import RepoNoteTool from "./note";
import RepoLinksTool from "./links";

const styles = require("./styles/index.less");

interface RepoDetailToolbarProps {
    store?: IStore;
}

interface RepoDetailToolbarState {}

@inject("store")
@observer
export default class RepoDetailToolbar extends React.Component<
    RepoDetailToolbarProps,
    RepoDetailToolbarState
> {
    constructor(props) {
        super(props);
    }

    viewInGithub = () => {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (selectedRepo) {
            const url = selectedRepo.htmlUrl;
            window.open(url, "_blank");
        }
    };

    starStarCabinet = () => {
        const mainStore = this.props.store!.main;

        mainStore
            .onStarStarCabinet()
            .then(() => {
                message.success("Thank you for starring me");
            })
            .catch(() => {
                message.info("Failed but thank you, maybe you have starred already");
                window.open("https://github.com/thundernet8/StarCabinet", "_blank");
            });
    };

    changeReadStatus = () => {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (selectedRepo) {
            mainStore.onUpdateSelectedRepo(selectedRepo.id, { read: !selectedRepo.read });
        }
    };

    changeRepoFlag = () => {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (selectedRepo) {
            mainStore.onUpdateSelectedRepo(selectedRepo.id, { flag: !selectedRepo.flag });
        }
    };

    changeRepoNote = (note: string) => {
        const mainStore = this.props.store!.main;
        const { selectedRepo } = mainStore;

        if (selectedRepo) {
            mainStore.onUpdateSelectedRepo(selectedRepo.id, { note });
        }
    };

    getRepoCategories = (id: number) => {
        const mainStore = this.props.store!.main;
        mainStore.onGetSelectRepoCategories(id);
    };

    render() {
        let readIcon;
        let flagIcon;

        const mainStore = this.props.store!.main;
        const { selectedRepo, categories } = mainStore;

        if (selectedRepo) {
            readIcon = (
                <Tooltip
                    placement="bottom"
                    title={selectedRepo.read ? "Mark as unread" : "Mark as read"}
                >
                    <Icon
                        type={selectedRepo.read ? "eye" : "eye-o"}
                        data-read={selectedRepo.read}
                        onClick={this.changeReadStatus}
                    />
                </Tooltip>
            );
            flagIcon = (
                <Tooltip placement="bottom" title={selectedRepo.flag ? "Remove flag" : "Add flag"}>
                    <Icon type="flag" data-flag={selectedRepo.flag} onClick={this.changeRepoFlag} />
                </Tooltip>
            );
        } else {
            readIcon = null;
            flagIcon = null;
        }
        return (
            <div
                className={ClassNames("detailToolbar", styles.detailToolbar, {
                    [styles.disabled]: !selectedRepo
                })}
            >
                <Tooltip placement="bottom" title="View in Github">
                    <Icon type="select" onClick={this.viewInGithub} />
                </Tooltip>
                {readIcon}
                {flagIcon}
                <RepoGroupTool
                    repo={selectedRepo}
                    categories={categories}
                    getCategories={this.getRepoCategories}
                    updateRepoCategories={mainStore.onUpdateRepoCategories}
                />
                <RepoNoteTool repo={selectedRepo} updateNote={this.changeRepoNote} />
                <RepoLinksTool repo={selectedRepo} />
                <Tooltip placement="bottomRight" title="Star StarCabinet">
                    <Icon type="github" onClick={this.starStarCabinet} />
                </Tooltip>
            </div>
        );
    }
}
