import React from "react";
import classNames from "classnames";
import MainGroupPane from "../containers/mainGroupPane";
import MainListPane from "../containers/mainListPane";
import MainDetailPane from "../containers/mainDetailPane";
import deepEqual from "deep-equal";
import dbName from "../utils/dbName";
import { MainPageProps } from "../containers/mainPage";

const styles = require("../assets/styles/main.less");

export default class MainPage extends React.Component<MainPageProps> {
    componentWillMount() {
        this.props
            .onGetLocalCredentials()
            .then(credentials => {
                return this.props.onGetRxDB(dbName(credentials.username));
            })
            .then(() => {
                this.props.onGetMyProfile();
                this.props.onGetCategories();
                this.props.onFetchStarredRepos();
            });
    }

    componentWillReceiveProps(nextProps) {
        // check search/order/filter/group conditions to judge whether the repos list should be updated
        if (
            !deepEqual(nextProps.search, this.props.search) ||
            !deepEqual(nextProps.order, this.props.order) ||
            !deepEqual(nextProps.filter, this.props.filter) ||
            !deepEqual(nextProps.group, this.props.group)
        ) {
            this.props.onNeedUpdateReposList();
        }
    }

    render() {
        return (
            <div className={classNames("main", styles.main)}>
                {/* <header id="titleBar"/> */}
                <section className={classNames("container", styles.container)}>
                    <MainGroupPane />
                    <MainListPane />
                    <MainDetailPane />
                </section>
            </div>
        );
    }
}
