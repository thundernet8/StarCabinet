import { connect } from "react-redux";
import RepoTagsBar from "../components/repoTagsBar";
import Actions from "../actions";
import IState from "../interface/IState";
import IRepo from "../interface/IRepo";

export interface RepoTagsBarProps {
    selectedRepo: IRepo | null;
    onAddTagForRepo: (id: number, tagName: string) => void;
    onRemoveTagForRepo: (id: number, tagName: string) => void;
    onGetTagsForRepo: (id: number) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        selectedRepo: state.selectedRepo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTagForRepo: (id, tagName) => {
            return dispatch(Actions.addTagForRepo(id, tagName));
        },
        onRemoveTagForRepo: (id, tagName) => {
            return dispatch(Actions.removeTagForRepo(id, tagName));
        },
        onGetTagsForRepo: repoId => {
            return dispatch(Actions.getSelectedRepoTags(repoId));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoTagsBar);
