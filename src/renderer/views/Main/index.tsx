import * as React from "react";

const styles = require("./styles/index.less");

interface MainViewProps {}

interface MainViewState {}

export default class MainView extends React.Component<MainViewProps, MainViewState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.container}>MainView</div>;
    }
}
