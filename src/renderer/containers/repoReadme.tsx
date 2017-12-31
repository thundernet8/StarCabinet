import { connect } from "react-redux";
import RepoReadme from "../components/repoReadme";
import Actions from "../actions";
import IState from "../interface/IState";
import IRepo from "../interface/IRepo";

export interface RepoReadmeProps {
    selectedRepo: IRepo | null;
    onFetchRepoReadMe: (repo: IRepo) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        selectedRepo: state.selectedRepo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRepoReadMe: repo => {
            return dispatch(Actions.fetchRepoReadMe(repo));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoReadme);
