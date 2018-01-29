// order by
enum OrderBy {
    ORDER_BY_DEFAULT = "defaultOrder", // TODO change to starred time, need change github api npm package
    ORDER_BY_STARS_COUNT = "stars",
    ORDER_BY_FORKS_COUNT = "forks",
    ORDER_BY_WATCHERS_COUNT = "watchers",
    ORDER_BY_OPEN_ISSUES_COUNT = "openIssues",
    ORDER_BY_SIZE = "size",
    ORDER_BY_CREATE_TIME = "createdTime",
    ORDER_BY_UPDATE_TIME = "updatedTime",
    ORDER_BY_PUSH_TIME = "pushedTime",
    ORDER_BY_SCORE = "score"
}

export default OrderBy;
