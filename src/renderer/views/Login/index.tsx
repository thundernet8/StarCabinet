import * as React from "react";

const styles = require("./styles/index.less");

interface LoginViewProps {}

interface LoginViewState {}

export default class LoginView extends React.Component<LoginViewProps, LoginViewState> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles.container}>LoginView</div>;
    }
}
