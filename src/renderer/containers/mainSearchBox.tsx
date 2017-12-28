import { connect } from "react-redux";
import MainSearchBox from "../components/mainSearchBox";
import Actions from "../actions";

// Redux connection
const mapStateToProps = state => {
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
