import { connect } from "react-redux";
import RepoContributorsBar from "../components/repoContributorsBar";
import Actions from "../actions";
import IState from "../interface/IState";
import IRepo from "../interface/IRepo";

export interface RepoContributorsBarProps {
    selectedRepo: IRepo | null;
    onFetchRepoContributors: (repo: IRepo) => void;
    onGetRepoContributors: (id: number) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        selectedRepo: state.selectedRepo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchRepoContributors: repo => {
            return dispatch(Actions.fetchRepoContributors(repo));
        },
        onGetRepoContributors: id => {
            return dispatch(Actions.getSelectedRepoContributors(id));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoContributorsBar);
