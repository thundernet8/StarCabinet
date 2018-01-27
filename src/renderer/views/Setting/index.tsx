import * as React from "react";

const styles = require("./styles/index.less");

interface SettingViewProps {}

interface SettingViewState {}

export default class SettingView extends React.Component<SettingViewProps, SettingViewState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.container}>SettingView</div>;
    }
}
