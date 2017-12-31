import { connect } from "react-redux";
import ReposList from "../components/reposList";
import Actions from "../actions";
import IState from "../interface/IState";
import IRepo from "../interface/IRepo";

export interface ReposListProps {
    repos: { [key: string]: IRepo };
    selectedRepo: IRepo | null;
    onSelectRepo: (repo: IRepo) => void;
    onRateRepo: (id: number, score: number) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
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
