import { connect } from "react-redux";
import App from "../components/app";
import Actions from "../actions";
import IState from "../interface/IState";

export interface AppProps {
    offline: boolean;
    listenNetworkChange: () => void;
    diListenNetworkChange: () => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        offline: state.offline.value
    };
};

const mapDispatchToProps = dispatch => {
    return {
        listenNetworkChange: () => {
            dispatch(Actions.listenNetworkChange());
        },
        diListenNetworkChange: () => {
            dispatch(Actions.diListenNetworkChange());
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(App);
