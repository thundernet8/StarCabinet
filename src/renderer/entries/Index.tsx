import * as React from "react";

// const styles = require("./index.less")

interface AppWrapperProps {}

interface AppWrapperState {}

export default class AppWrapper extends React.Component<AppWrapperProps, AppWrapperState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>AppWrapper{this.props.children}</div>;
    }
}
