import * as React from "react";
import { observer, inject } from "mobx-react";
import IStore from "../../interface/IStore";

const defaultAvatar = require("../../assets/images/avatar-default.png");

const styles = require("./styles/index.less");

interface MainGroupAvatarProps {
    store?: IStore;
}

interface MainGroupAvatarState {}

@inject("store")
@observer
export default class MainGroupAvatar extends React.Component<
    MainGroupAvatarProps,
    MainGroupAvatarState
> {
    constructor(props) {
        super(props);
    }

    get homepage() {
        const globalStore = this.props.store!.global;
        const { profile } = globalStore;
        if (profile && profile.htmlUrl) {
            return profile.htmlUrl;
        }
        return "javascript:;";
    }

    get avatar() {
        const globalStore = this.props.store!.global;
        const { profile } = globalStore;
        if (profile && profile.avatarUrl) {
            return profile.avatarUrl;
        }
        return defaultAvatar;
    }

    render() {
        const globalStore = this.props.store!.global;
        const { profile } = globalStore;

        return (
            <div className={styles.profileCard}>
                <a href={this.homepage} target="_blank">
                    <img className={styles.profileAvatar} src={this.avatar} />
                </a>
                {profile && <p className={styles.profileName}>{profile.name}</p>}
            </div>
        );
    }
}
