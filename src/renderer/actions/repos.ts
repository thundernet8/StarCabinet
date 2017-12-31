import * as CONSTANTS from "../constants";
import GithubClient from "../utils/githubClient";
import DBHandler from "../rxdb/dbHandler";
import Promise from "bluebird";
import { updateLanguagesList } from "./languages";

export const updateReposList = () => {
    // this action only query local data, never fetch the remote server
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.QUERY_REPOS_LIST
        });

        const state = getState();
        const conditions = {
            group: state.group,
            search: state.search,
            order: state.order,
            filter: state.filter
        };

        const dbHandler = new DBHandler(getState().db);
        return dbHandler
            .initDB()
            .then(() => dbHandler.getRepos(conditions))
            .then(repos => {
                // for easily replace one specified item of list
                // we need convert the array to key-value pairs
                let keyedRepos = {};
                repos.forEach(repo => {
                    keyedRepos["_" + repo.id] = repo;
                });

                dispatch({
                    type: CONSTANTS.QUERY_REPOS_LIST_SUCCESS,
                    payload: { repos: keyedRepos }
                });
                return repos;
            })
            .catch(error => {
                dispatch({
                    type: CONSTANTS.QUERY_REPOS_LIST_FAIL,
                    error
                });
                throw new Error(error);
            });
    };
};

export const fetchRemoteReposList = (isStartUp = false) => {
    return (dispatch, getState) => {
        dispatch({
            type: CONSTANTS.FETCH_REPOS_LIST // show refresh spin
        });

        let promise;
        // when app startup it always fetch the remote server, but at this time we use local storaged data first
        if (isStartUp) {
            promise = Promise.all([dispatch(updateReposList()), dispatch(updateLanguagesList())]);
        } else {
            promise = Promise.resolve(true);
        }

        const state = getState();
        const client = new GithubClient(state.credentials);
        return client
            .getStarredRepos()
            .then(ret => ret.data)
            .then(repos => {
                const dbHandler = new DBHandler(state.db);
                return dbHandler
                    .initDB()
                    .then(() => {
                        return promise
                            .then(() =>
                                Promise.all([
                                    dbHandler.upsertRepos(repos),
                                    dbHandler.upsertOwners(repos),
                                    dbHandler.upsertLanguages(repos),
                                    dbHandler.recordReposCount(repos.length)
                                ])
                            )
                            .then(ret => {
                                dispatch({
                                    type: CONSTANTS.FETCH_REPOS_LIST_SUCCESS,
                                    payload: { increase: ret[3] }
                                });

                                // update languages state meanwhile
                                dispatch(updateLanguagesList());
                                // update repos state meanwhile
                                dispatch(updateReposList());

                                return repos;
                            })
                            .catch(error => {
                                dispatch({
                                    type: CONSTANTS.FETCH_REPOS_LIST_FAIL,
                                    error
                                });
                                return error;
                            });
                    })
                    .catch(error => {
                        return error;
                    });
            })
            .catch(error => {
                dispatch({
                    type: CONSTANTS.FETCH_REPOS_LIST_FAIL,
                    error
                });

                // now update the repos list from indexed db
                dispatch(updateReposList());

                return error;
            });
    };
};

// after view one repo, more detail info fetched from server and saved to current selected repo object
// we need also update the repos list
// but actually we only need replace one item of list rather than refresh all repos in memory
export const replaceReposListItem = repo => {
    return (dispatch, getState) => {
        const state = getState();
        let repos = state.repos;

        const repoInList = repos["_" + repo.id];
        if (!repoInList) {
            return;
        }
        repo._categories = repo._categories || repoInList._categories;
        repo._tags = repo._tags || repoInList._tags;
        repo._contributors = repo._contributors || repoInList._contributors;
        repo._hotChange = [].concat(repo._hotChange || [], repoInList._hotChange || []);

        repos["_" + repo.id] = repo;

        dispatch({
            type: CONSTANTS.REPLACE_REPOS_LIST_ITEM,
            payload: { repos }
        });
    };
};

// after fetched repos from server and compare the num of repos between new and old
// a notification popup to remind you how many new starred repos
// after that we need reset the change num to 0 to prevent more notifications
export const clearReposChangeNum = () => {
    return {
        type: CONSTANTS.CLEAR_INCREASE_PROP
    };
};
