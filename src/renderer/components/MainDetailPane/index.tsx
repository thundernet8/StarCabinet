import * as React from "react";
import ClassNames from "classnames";
import RepoDetailToolbar from "../RepoDetailToolbar";
import RepoDetail from "../RepoDetail";

const githubBg = require("../../assets/images/github-gray.png");

const styles = require("./styles/index.less");

interface MainDetailPaneProps {}

interface MainDetailPaneState {}

export default class MainDetailPane extends React.Component<
    MainDetailPaneProps,
    MainDetailPaneState
> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ClassNames("right", styles.right)}>
                <header className={ClassNames("detailHeader", styles.detailHeader)}>
                    <RepoDetailToolbar />
                </header>
                <section
                    className={ClassNames("detailContent", styles.detailContent)}
                    id="detailContent"
                    style={{
                        backgroundImage: `url(${githubBg})`
                    }}
                >
                    <RepoDetail />
                </section>
            </div>
        );
    }
}
