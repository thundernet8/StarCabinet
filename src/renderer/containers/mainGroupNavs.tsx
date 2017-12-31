import { connect } from "react-redux";
import MainGroupNavs from "../components/mainGroupNavs";
import Actions from "../actions";
import IState from "../interface/IState";
import { IGroupConditionState } from "../interface/IConditional";
import ILanguage from "../interface/ILanguage";
import ICategory from "../interface/ICategory";
import { IRepoFetchingStatus } from "../interface/IRepo";

export interface MainGroupNavsProps {
    group: IGroupConditionState;
    languages: ILanguage[];
    categories: ICategory[];
    fetchStatus: IRepoFetchingStatus;
    onUpdateGroupCondition: (group: IGroupConditionState) => void;
    onDeleteCategory: (id: number) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        group: state.group,
        languages: state.languages,
        categories: state.categories,
        fetchStatus: state.fetchStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateGroupCondition: group => {
            return dispatch(Actions.updateGroupCondition(group));
        },
        onDeleteCategory: id => {
            return dispatch(Actions.deleteCategory(id));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainGroupNavs);
