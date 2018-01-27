export interface ISearchConditionState {
    key: string;
    field: string;
}

export interface IFilterConditionState {
    hasFlag: boolean;
    hasNote: boolean;
    unread: boolean;
}

export interface IOrderConditionState {
    by: string;
    desc: boolean;
}

export interface IGroupConditionState {
    type: string;
    id: string;
}
