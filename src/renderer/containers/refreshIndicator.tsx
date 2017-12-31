import { connect } from "react-redux";
import RefreshIndicator from "../components/refreshIndicator";
import Actions from "../actions";
import IState from "../interface/IState";
import { IRepoFetchingStatus } from "../interface/IRepo";
import IOfflineState from "../interface/IOffline";

export interface RefreshIndicatorProps {
    fetchStatus: IRepoFetchingStatus;
    offline: IOfflineState;
    increase: number;
    onRefresh: () => void;
    onClearIncreaseProp: () => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        fetchStatus: state.fetchStatus,
        offline: state.offline.value,
        increase: state.increase
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRefresh: () => {
            return dispatch(Actions.fetchRemoteReposList());
        },
        onClearIncreaseProp: () => {
            dispatch(Actions.clearReposChangeNum());
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RefreshIndicator);
