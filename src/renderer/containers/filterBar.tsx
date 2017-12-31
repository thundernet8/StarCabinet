import { connect } from "react-redux";
import FilterBar from "../components/filterBar";
import Actions from "../actions";
import IState from "../interface/IState";
import { IFilterConditionState } from "../interface/IConditional";
import { IRepoFetchingStatus } from "../interface/IRepo";

export interface FilterBarProps {
    filter: IFilterConditionState;
    fetchStatus: IRepoFetchingStatus;
    onUpdateFilterCondition: (filter: IFilterConditionState) => void;
}

// Redux connection
const mapStateToProps = state => {
    return {
        filter: state.filter,
        fetchStatus: state.fetchStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateFilterCondition: filter => {
            return dispatch(Actions.updateFilterCondition(filter));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
