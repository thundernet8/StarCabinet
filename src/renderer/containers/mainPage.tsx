import { connect } from "react-redux";
import MainPage from "../components/mainPage";
import Actions from "../actions";
import IState from "../interface/IState";
import {
    ISearchConditionState,
    IFilterConditionState,
    IOrderConditionState,
    IGroupConditionState
} from "../interface/IConditional";
import { ICredentialsState } from "../interface/IAccount";

export interface MainPageProps {
    search: ISearchConditionState;
    order: IOrderConditionState;
    filter: IFilterConditionState;
    group: IGroupConditionState;
    onGetLocalCredentials: () => Promise<ICredentialsState>;
    onGetRxDB: (dbName: string) => void;
    onNeedUpdateReposList: () => void;
    onGetMyProfile: () => void;
    onGetCategories: () => void;
    onFetchStarredRepos: () => void;
}

// Redux connection
const mapStateToProps = (state: IState) => {
    return {
        search: state.search,
        order: state.order,
        filter: state.filter,
        group: state.group
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetLocalCredentials: () => {
            return dispatch(Actions.getLocalCredentials());
        },
        onGetRxDB: dbName => {
            return dispatch(Actions.connectRxDB(dbName));
        },
        onNeedUpdateReposList: () => {
            return dispatch(Actions.updateReposList());
        },
        onGetMyProfile: () => {
            return dispatch(Actions.getMyProfile());
        },
        onGetCategories: () => {
            return dispatch(Actions.updateCategoriesList());
        },
        onFetchStarredRepos: () => {
            return dispatch(Actions.fetchRemoteReposList(true));
        }
    };
};

// Which props to inject from the global atomic state
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
