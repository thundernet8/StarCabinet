import * as React from "react";
import ClassNames from "classnames";
import MainGroupPane from "../../components/MainGroupPane";
import MainListPane from "../../components/MainListPane";
import MainDetailPane from "../../components/MainDetailPane";

const styles = require("./styles/index.less");

interface MainViewProps {}

interface MainViewState {}

export default class MainView extends React.Component<MainViewProps, MainViewState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ClassNames("main", styles.main)}>
                {/* <header id="titleBar"/> */}
                <section className={ClassNames("container", styles.container)}>
                    <MainGroupPane />
                    <MainListPane />
                    <MainDetailPane />
                </section>
            </div>
        );
    }
}
