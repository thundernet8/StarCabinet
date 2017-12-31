import React from "react";
import classNames from "classnames";
import MainSearchBox from "../containers/mainSearchBox";
import SortBar from "../containers/sortBar";
import ReposList from "../containers/reposList";
import FilterBar from "../containers/filterBar";

const styles = require("../styles/main.less");

// middle part of the main window
export default class MainListPane extends React.Component<{}> {
    render() {
        return (
            <div className={classNames("mid", styles.mid)}>
                <MainSearchBox />
                <SortBar />
                <ReposList />
                <FilterBar />
            </div>
        );
    }
}
