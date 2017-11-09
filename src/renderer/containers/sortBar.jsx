import { connect } from "react-redux";
import SortBar from "../components/sortBar";
import Actions from "../actions";

// Redux connection
const mapStateToProps = state => {
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
