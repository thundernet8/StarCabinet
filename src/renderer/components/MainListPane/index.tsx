import * as React from "react";
import ClassNames from "classnames";
import SearchBox from "../SearchBox";
import SortBar from "../SortBar";
import ReposList from "../ReposList";
import ReposListPagination from "../ReposListPagination";
import FilterBar from "../FilterBar";

const styles = require("./styles/index.less");

interface MainListPaneProps {}

interface MainListPaneState {}

export default class MainListPane extends React.Component<MainListPaneProps, MainListPaneState> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ClassNames("mid", styles.mid)}>
                <SearchBox />
                <SortBar />
                <ReposList />
                <ReposListPagination />
                <FilterBar />
            </div>
        );
    }
}
