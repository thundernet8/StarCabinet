import { connect } from "react-redux";
import ReposList from "../components/reposList";
import Actions from "../actions";

// Redux connection
const mapStateToProps = state => {
    return {
        repos: state.repos,
        selectedRepo: state.selectedRepo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectRepo: repo => {
            dispatch(Actions.selectOneRepo(repo));
        },
        onRateRepo: (id, score) => {
            dispatch(Actions.rateOneRepo(id, score));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(ReposList);
