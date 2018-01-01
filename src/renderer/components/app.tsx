import React from "react";
import { message } from "antd";
import offlineTitle from "../utils/offlineTitle";
import { AppProps } from "../containers/app";

require("../assets/styles/global/global.less");

interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
    componentDidMount() {
        this.props.listenNetworkChange();
    }

    componentWillUnmount() {
        this.props.diListenNetworkChange();
    }

    componentWillReceiveProps(nextProps: AppProps) {
        offlineTitle(nextProps.offline);
        if (nextProps.offline === true) {
            message.warning("You are offline now");
        } else if (nextProps.offline === false) {
            message.success("Back online now");
        }
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}
