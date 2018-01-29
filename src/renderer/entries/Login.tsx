import * as React from "react";
import LoginView from "../views/Login";

interface LoginEntryProps {}

interface LoginEntryState {}

export default class LoginEntry extends React.Component<LoginEntryProps, LoginEntryState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <LoginView />;
    }
}
