import * as React from "react";
import SettingView from "../views/Setting";

interface SettingEntryProps {}

interface SettingEntryState {}

export default class SettingEntry extends React.Component<SettingEntryProps, SettingEntryState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <SettingView />;
    }
}
