import * as React from "react";
import MainView from "../views/Main";

interface MainEntryProps {}

interface MainEntryState {}

export default class MainEntry extends React.Component<MainEntryProps, MainEntryState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <MainView />;
    }
}
