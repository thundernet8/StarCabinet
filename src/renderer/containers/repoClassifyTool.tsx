import { connect } from "react-redux";
import RepoClassifyTool from "../components/repoClassifyTool";
import Actions from "../actions";
import IState from "../interface/IState";
import ICategory from "../interface/ICategory";
import IRepo from "../interface/IRepo";

export interface RepoClassifyToolProps {
    repo: IRepo;
    categories: ICategory[];
    onGetCategoriesForRepo: (id: number) => Promise<ICategory[]>;
    onUpdateRepoCategories: (id: number, catIds: number[]) => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCategoriesForRepo: id => {
            return dispatch(Actions.getSelectedRepoCategories(id));
        },
        onUpdateRepoCategories: (id, catIds) => {
            return dispatch(Actions.updateRepoCategories(id, catIds));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(RepoClassifyTool);
