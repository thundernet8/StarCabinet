import * as React from "react";
import ClassNames from "classnames";
import RefreshIndicator from "../RefreshIndicator";
import MainGroupAvatar from "../MainGroupAvatar";
import MainGroupNavs from "../MainGroupNavs";
import MainGroupFooter from "../MainGroupFooter";

const styles = require("./styles/index.less");

interface MainGroupPaneProps {}

interface MainGroupPaneState {}

export default class MainGroupPane extends React.Component<MainGroupPaneProps, MainGroupPaneState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ClassNames("left", styles.left)}>
                <header id="titleBar">
                    <RefreshIndicator />
                </header>
                <MainGroupAvatar />
                <MainGroupNavs />
                <MainGroupFooter />
            </div>
        );
    }
}
