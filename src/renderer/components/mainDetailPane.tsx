import React from "react";
import classNames from "classnames";
import RepoDetailToolbar from "../containers/repoDetailToolbar";
import RepoDetail from "../containers/repoDetail";

const styles = require("../styles/main.less");

// right part of the main window - for displaying selected repo detail
export default class MainDetailPane extends React.Component<{}> {
    render() {
        return (
            <div className={classNames("right", styles.right)}>
                <header className={classNames("detailHeader", styles.detailHeader)}>
                    <RepoDetailToolbar />
                </header>
                <section
                    className={classNames("detailContent", styles.detailContent)}
                    id="detailContent"
                    style={{
                        backgroundImage: `url(${require("../assets/images/github-gray.png")})`
                    }}
                >
                    <RepoDetail />
                </section>
            </div>
        );
    }
}
