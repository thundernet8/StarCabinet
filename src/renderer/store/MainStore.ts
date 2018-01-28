import { observable, action, toJS } from "mobx";
import ILanguage from "../interface/ILanguage";
import ICategory from "../interface/ICategory";
import GroupType from "../enum/GroupType";
import SearchType from "../enum/SearchType";
import OrderBy from "../enum/OrderBy";
import {
    IGroupConditionState,
    ISearchConditionState,
    IOrderConditionState,
    IFilterConditionState
} from "../interface/IConditional";
import GlobalStore from "../store/GlobalStore";
import DBHandler from "../rxdb/dbHandler";
import logger from "../utils/logger";
import IRepo from "../interface/IRepo";
import GithubClient from "../utils/githubClient";

export default class MainStore {
    private globalStore: GlobalStore;

    constructor(globalStore: GlobalStore) {
        this.globalStore = globalStore;
    }

    private getDbHandler = () => {
        return this.globalStore.getDb().then(db => {
            return new DBHandler(db);
        });
    };

    public startup = () => {
        return this.globalStore.restore().then(() => {
            this.updateCategoryList();
            this.updateLanguageList();
            return this.fetchRemoteRepos();
        });
    };

    /**
     * Fetch status
     */
    @observable fetching: boolean = false;

    /**
     * Languages
     */
    @observable languages: ILanguage[] = [];

    @action
    updateLanguageList = () => {
        return this.getDbHandler()
            .then(dbHandler => dbHandler.initDB())
            .then(dbHandler => dbHandler.getLanguages())
            .then(languages => {
                this.languages = languages;
                return languages;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
            });
    };

    /**
     * Categories
     */
    @observable categories: ICategory[] = [];

    @action
    updateCategoryList = () => {
        return this.getDbHandler()
            .then(dbHandler => dbHandler.initDB())
            .then(dbHandler => dbHandler.getCategories())
            .then(categories => {
                this.categories = categories;
                return categories;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
            });
    };

    @action
    addNewCategory = (name: string) => {
        const { categories } = this;
        return this.getDbHandler()
            .then(dbHandler => dbHandler.initDB())
            .then(dbHandler => dbHandler.upsertCategory(name))
            .then(categoryDoc => {
                this.categories = new Array().concat(categories).concat(categoryDoc.toJSON());

                return categoryDoc;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
                throw error;
            });
    };

    @action
    delCategory = (id: number) => {
        return this.getDbHandler()
            .then(dbHandler => dbHandler.initDB())
            .then(dbHandler => dbHandler.deleteCategory(id))
            .then(() => {
                this.updateCategoryList();
                return true;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
            });
    };

    /**
     * Search condition
     */
    @observable search: ISearchConditionState = { key: "", field: SearchType.SEARCH_FIELD_ALL };

    @action
    onUpdateSearchCondition = (key: string, field: SearchType) => {
        const { search, repos } = this;
        if (key !== search.key || field !== search.field) {
            this.search = {
                key,
                field
            };
            return this.updateRepoList();
        }
        return Promise.resolve(toJS(repos));
    };

    /**
     * Order condition
     */
    @observable order: IOrderConditionState = { by: OrderBy.ORDER_BY_DEFAULT, desc: true };

    @action
    onUpdateOrderCondition = (desc: boolean, by: OrderBy) => {
        logger.log(`Sort: ${by} ${desc ? "DESC" : "ASC"}`);
        const { order, repos } = this;
        if (order.desc !== desc || order.by !== by) {
            this.order = {
                desc,
                by
            };
            return this.updateRepoList();
        }
        return Promise.resolve(toJS(repos));
    };

    /**
     * filter condition
     */
    @observable filter: IFilterConditionState = { hasFlag: false, hasNote: false, unread: false };

    @action
    onUpdateFilterCondition = (newFilter: IFilterConditionState) => {
        logger.log(`Filter: ${newFilter}`);
        const { filter, repos } = this;
        if (
            filter.hasFlag !== newFilter.hasFlag ||
            filter.hasNote !== newFilter.hasNote ||
            filter.unread !== newFilter.unread
        ) {
            this.filter = newFilter;
            return this.updateRepoList();
        }
        return Promise.resolve(toJS(repos));
    };

    /**
     * Group condition
     */
    @observable
    group: IGroupConditionState = {
        id: GroupType.GROUP_TYPE_ALL,
        type: GroupType.GROUP_TYPE_ALL
    };

    @observable openNavMenus: GroupType[] = [GroupType.GROUP_TYPE_ALL];

    @action
    onClickNavMenuItem = ({ key, keyPath }) => {
        if (this.fetching) {
            return; // not available when fetching data
        }
        let group;
        if (keyPath.length === 1) {
            group = {
                id: key,
                type: key
            };
        } else {
            group = {
                id: key,
                type: keyPath[1]
            };
        }
        if (group.id === this.group.id) {
            return;
        }
        this.group = group;
        this.updateRepoList();
    };

    @action
    onToggleNavMenus = (openKeys: GroupType[]) => {
        const { openNavMenus } = this;
        const latestOpenKey = openKeys.find(key => !(openNavMenus.indexOf(key) > -1));

        let nextOpenKeys: GroupType[] = [];
        if (latestOpenKey) {
            nextOpenKeys = new Array().concat(latestOpenKey);
        }
        this.openNavMenus = nextOpenKeys;
    };

    /**
     * Repos
     */
    @observable repos: IRepo[] = [];

    @observable reposMap: { [key: string]: IRepo } = {};

    @action
    updateRepoList = () => {
        logger.log("Update repo list");
        const { group, search, order, filter } = this;
        const conditions = {
            group,
            search,
            order,
            filter
        };

        return this.getDbHandler()
            .then(dbHandler => dbHandler.getRepos(conditions))
            .then(repos => {
                // for easily replace one specified item of list
                // we need convert the array to key-value pairs
                let keyedRepos: { [key: string]: IRepo } = {};
                repos.forEach(repo => {
                    keyedRepos[repo.id] = repo;
                });

                this.repos = repos;
                this.reposMap = keyedRepos;
                return repos;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
                // throw error;
            });
    };

    @action
    fetchRemoteRepos = () => {
        if (this.fetching) {
            return Promise.reject(false);
        }
        const client = new GithubClient(this.globalStore.credentials);
        this.fetching = true;
        return client
            .getStarredRepos()
            .then(ret => ret.data)
            .then(repos => {
                return this.getDbHandler()
                    .then(dbHandler => {
                        return Promise.all([
                            dbHandler.upsertRepos(repos),
                            dbHandler.upsertOwners(repos),
                            dbHandler.upsertLanguages(repos),
                            dbHandler.recordReposCount(repos.length)
                        ]);
                    })
                    .then(ret => {
                        this.updateLanguageList();
                        this.updateRepoList();

                        // return repo count change
                        return ret[3];
                    });
            })
            .catch(error => {
                logger.log(error.message || error.toString());
                this.updateRepoList();
                throw error;
            })
            .finally(() => {
                this.fetching = false;
            });
    };

    /**
     * Selected repo
     */
    @observable selectedRepo: IRepo;

    @action
    onSelectRepo = (id: number) => {
        const { repos } = this;
        this.selectedRepo = repos[id];
    };

    @action
    onRateRepo = (id: number, score: number) => {
        const { repos } = this;
        const updateObj = {
            id,
            score
        };

        return this.getDbHandler()
            .then(dbHandler => dbHandler.updateRepo(updateObj))
            .then(repo => {
                // also replace new repo into repos list
                repos[repo.id] = repo;
                this.repos = Object.assign({}, repos);

                return repo;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
                // throw error;
            });
    };

    /**
     * Star StarCabinet
     */
    onStarStarCabinet = () => {
        const client = new GithubClient(this.globalStore.credentials);
        return client
            .starStarCabinet()
            .then(ret => {
                return ret;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
                throw new Error(error);
            });
    };

    /**
     * Update select repo(flag, read status, note...)
     */
    onUpdateSelectedRepo = (id: number, properties: { [key: string]: any }) => {
        properties.id = id;
        return this.getDbHandler()
            .then(dbHandler => dbHandler.updateRepo(properties))
            .then(repo => {
                // also replace the repo in repos list
                repo._hotChange = Object.keys(properties); // mark the repo that its readme etc.. has fetched, do not fetch again
                let { repos, reposMap } = this;
                reposMap[id] = repo;
                repos = repos.map(repo => reposMap[repo.id]);

                this.repos = Array.from(repos);
                this.reposMap = Object.assign({}, reposMap);
                this.selectedRepo = repo;

                return repo;
            })
            .catch(error => {
                logger.log(error.message || error.toString());
                throw error;
            });
    };
}
