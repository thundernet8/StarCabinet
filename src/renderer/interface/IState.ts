import IRepo, { IRepoFetchingStatus } from "../interface/IRepo";
import IProfile from "../interface/IProfile";
import IOfflineState from "../interface/IOffline";
import ILanguage from "../interface/ILanguage";
import {
    ISearchConditionState,
    IFilterConditionState,
    IOrderConditionState,
    IGroupConditionState
} from "../interface/IConditional";
import ICategory, { ICategoryCreateResult } from "../interface/ICategory";
import { ICredentialsState, ILoginResultState } from "../interface/IAccount";
import { RxDatabase } from "rxdb";

export default interface IState {
    routing: any;
    offline: IOfflineState;
    db: RxDatabase;
    credentials: ICredentialsState;
    profile: IProfile | null;
    loginResult: ILoginResultState;
    search: ISearchConditionState;
    order: IOrderConditionState;
    filter: IFilterConditionState;
    group: IGroupConditionState;
    repos: { [key: string]: IRepo };
    increase: number;
    languages: ILanguage[];
    categories: ICategory[];
    fetchStatus: IRepoFetchingStatus;
    catAdd: ICategoryCreateResult;
    selectedRepo: IRepo | null;
};
