import * as React from "react";
import NotFoundView from "../views/NotFound";

interface NotFoundEntryProps {}

interface NotFoundEntryState {}

export default class NotFoundEntry extends React.Component<NotFoundEntryProps, NotFoundEntryState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <NotFoundView />;
    }
}
