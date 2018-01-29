import * as React from "react";
import { observer, inject } from "mobx-react";
import { message } from "antd";
import IStore from "../interface/IStore";
import offlineTitle from "../utils/offlineTitle";
import logger from "../utils/logger";

interface AppWrapperProps {
    store?: IStore;
}

interface AppWrapperState {}

@inject("store")
@observer
export default class AppWrapper extends React.Component<AppWrapperProps, AppWrapperState> {
    constructor(props) {
        super(props);
    }

    updateNetworkStatus = () => {
        let offline = !navigator.onLine;

        logger.log(`Network change, ${offline ? "offline" : "online"}`);

        if (offline) {
            document.body.classList.add("offline");
            message.warning("You are offline now");
        } else {
            document.body.classList.remove("offline");
            message.success("Back online now");
        }

        offlineTitle(offline);

        if (this.props.store!.global) {
            this.props.store!.global.setOffline(offline);
        }
    };

    componentDidMount() {
        window.addEventListener("online", this.updateNetworkStatus);
        window.addEventListener("offline", this.updateNetworkStatus);
    }

    componentWillUnmount() {
        window.removeEventListener("online", this.updateNetworkStatus);
        window.removeEventListener("offline", this.updateNetworkStatus);
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}
