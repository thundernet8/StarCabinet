import * as React from "react";

// const styles = require("./index.less")

interface NotFoundEntryProps {}

interface NotFoundEntryState {}

export default class NotFoundEntry extends React.Component<NotFoundEntryProps, NotFoundEntryState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>NotFoundEntry</div>;
    }
}
