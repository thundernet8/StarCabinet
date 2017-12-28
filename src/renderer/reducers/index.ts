import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { credentialsReducer, loginResultReducer } from "./accounts";
import { offlineReducer } from "./network";
import { dbConnectReducer } from "./db";
import { reposListReducer, fetchingReposStatusReducer, reposIncreaseReducer } from "./repos";
import {
    searchConditionReducer,
    orderConditionReducer,
    groupConditionReducer,
    filterConditionReducer
} from "./conditional";
import { profileReducer } from "./profile";
import { languagesReducer } from "./languages";
import { categoriesReducer, categoryAddingResultReducer } from "./categories";
import { selectedRepoReducer } from "./repo";

export default combineReducers({
    routing: routerReducer,
    offline: offlineReducer,
    db: dbConnectReducer,
    credentials: credentialsReducer,
    profile: profileReducer,
    loginResult: loginResultReducer,
    search: searchConditionReducer,
    order: orderConditionReducer,
    filter: filterConditionReducer,
    group: groupConditionReducer,
    repos: reposListReducer,
    increase: reposIncreaseReducer,
    languages: languagesReducer,
    categories: categoriesReducer,
    fetchStatus: fetchingReposStatusReducer,
    catAdd: categoryAddingResultReducer,
    selectedRepo: selectedRepoReducer
});
