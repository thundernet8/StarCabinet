import { connect } from "react-redux";
import LoginPage from "../components/loginPage";
import Actions from "../actions";
import IState from "../interface/IState";
import { ICredentialsState, ILoginResultState } from "../interface/IAccount";

export interface LoginPageProps {
    credentials: ICredentialsState;
    loginResult: ILoginResultState;
    onGetLocalCredentials: (autoSignin: boolean) => Promise<string>;
    onRequestLogin: (
        credentials: ICredentialsState,
        cb: (success: boolean, msg: string) => void
    ) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        credentials: state.credentials,
        loginResult: state.loginResult
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetLocalCredentials: autoSignin => {
            return dispatch(Actions.getLocalCredentials(autoSignin));
        },
        onRequestLogin: credentials => {
            return dispatch(Actions.requestLogin(credentials));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
