import * as React from "react";

const styles = require("./styles/index.less");

interface NotFoundViewProps {}

interface NotFoundViewState {}

export default class NotFoundView extends React.Component<NotFoundViewProps, NotFoundViewState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.container}>NotFoundView</div>;
    }
}
