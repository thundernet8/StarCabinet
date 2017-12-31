import { connect } from "react-redux";
import MainSearchBox from "../components/mainSearchBox";
import Actions from "../actions";
import IState from "../interface/IState";
import { ISearchConditionState } from "../interface/IConditional";
import IRepo, { IRepoFetchingStatus } from "../interface/IRepo";

export interface MainSearchBoxProps {
    search: ISearchConditionState;
    fetchStatus: IRepoFetchingStatus;
    repos: { [key: string]: IRepo };
    onUpdateSearchCondition: (search: ISearchConditionState) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        search: state.search,
        fetchStatus: state.fetchStatus,
        repos: state.repos
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateSearchCondition: search => {
            return dispatch(Actions.updateSearchCondition(search));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainSearchBox);
