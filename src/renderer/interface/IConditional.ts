import OrderBy from "../enum/OrderBy";
import SearchType from "../enum/SearchType";
import GroupType from "../enum/GroupType";

export interface ISearchConditionState {
    key: string;
    field: SearchType;
}

export interface IFilterConditionState {
    hasFlag: boolean;
    hasNote: boolean;
    unread: boolean;
}

export interface IOrderConditionState {
    by: OrderBy;
    desc: boolean;
}

export interface IGroupConditionState {
    type: GroupType;
    id: string;
}
