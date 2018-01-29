// nav group types
enum GroupType {
    GROUP_TYPE_CATEGORY = "GROUP_TYPE_CATEGORY",
    GROUP_TYPE_LANGUAGE = "GROUP_TYPE_LANGUAGE",
    GROUP_TYPE_UNKNOWN = "GROUP_TYPE_UNKNOWN", // repos who do not have a custom category
    GROUP_TYPE_ALL = "GROUP_TYPE_ALL" // means removing category filter
}

export default GroupType;
