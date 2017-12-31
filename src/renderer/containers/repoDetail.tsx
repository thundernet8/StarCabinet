import { connect } from "react-redux";
import RepoDetail from "../components/repoDetail";
import IState from "../interface/IState";
import IRepo from "../interface/IRepo";

export interface RepoDetailProps {
    selectedRepo: IRepo | null;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        selectedRepo: state.selectedRepo
    };
};

const mapDispatchToProps = () => {
    return {};
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoDetail);
