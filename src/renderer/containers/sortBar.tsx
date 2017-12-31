import { connect } from "react-redux";
import SortBar from "../components/sortBar";
import Actions from "../actions";
import IState from "../interface/IState";
import { IOrderConditionState } from "../interface/IConditional";
import IRepo, { IRepoFetchingStatus } from "../interface/IRepo";

export interface SortBarProps {
    order: IOrderConditionState;
    fetchStatus: IRepoFetchingStatus;
    repos: { [key: string]: IRepo };
    onUpdateOrderCondition: (order: IOrderConditionState) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        order: state.order,
        fetchStatus: state.fetchStatus,
        repos: state.repos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateOrderCondition: order => {
            return dispatch(Actions.updateOrderCondition(order));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(SortBar);
