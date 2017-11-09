import { connect } from "react-redux";
import MainGroupNavs from "../components/mainGroupNavs";
import Actions from "../actions";

// Redux connection
const mapStateToProps = state => {
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
