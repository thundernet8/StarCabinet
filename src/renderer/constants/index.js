// debug

export const DEBUG = process.env.NODE_ENV === 'development'

// accounts

export const GET_LOCAL_CREDENTIALS = 'GET_LOCAL_CREDENTIALS'
export const GET_LOCAL_CREDENTIALS_SUCCESS = 'GET_LOCAL_CREDENTIALS_SUCCESS'
export const GET_LOCAL_CREDENTIALS_FAIL = 'GET_LOCAL_CREDENTIALS_FAIL'

export const CLEAR_LOGIN_USERNAME = 'CLEAR_LOGIN_USERNAME'
export const CLEAR_LOGIN_PASSWORD = 'CLEAR_LOGIN_PASSWORD'

export const CHANGE_LOGIN_USERNAME = 'CHANGE_LOGIN_USERNAME'
export const CHANGE_LOGIN_PASSWORD = 'CHANGE_LOGIN_PASSWORD'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS'
export const REQUEST_LOGIN_FAIL = 'REQUEST_LOGIN_FAIL'

// localStorage key

export const LOCAL_STORAGE_USERNAME_KEY = 'sc_username'
export const LOCAL_STORAGE_USER_PROFILE = 'sc_profile'

// app network

export const APP_OFFLINE = 'APP_OFFLINE'
export const APP_ONLINE = 'APP_ONLINE'

// database
export const DB_CONNECTING = 'DB_CONNECTING'
export const DB_CONNECTED = 'DB_CONNECTED'
export const DB_DISCONNECTED = 'DB_DISCONNECTED'
export const DB_CONNECTION_CHANGE = 'DB_CONNECTION_CHANGE'

export const DB_COLLECTION_CHANGE = 'DB_COLLECTION_CHANGE' // include doc insert/update/delete.. of docs on this collection
export const DB_DOCUMENT_INSERT = 'DB_DOCUMENT_INSERT'
export const DB_DOCUMENT_DELETE = 'DB_DOCUMENT_DELETE'
export const DB_DOCUMENT_UPDATE = 'DB_DOCUMENT_UPDATE'

// database collections
export const DB_COLLECTION_OF_REPO = 'repos'
export const DB_COLLECTION_OF_OWNER = 'owners'
export const DB_COLLECTION_OF_TAG = 'tags'
export const DB_COLLECTION_OF_CATEGORY = 'categories'
export const DB_COLLECTION_OF_ME = 'me'

// real-time repos lists sync with rxdb
export const UPDATE_REPOS_LIST = 'UPDATE_REPOS_LIST'
export const UPDATE_REPOS_LIST_SUCCESS = 'UPDATE_REPOS_LIST_SUCCESS'
export const UPDATE_REPOS_LIST_FAIL = 'UPDATE_REPOS_LIST_FAIL'

// fetch repos from server
export const FETCH_REPOS_LIST = 'FETCH_REPOS_LIST'
export const FETCH_REPOS_LIST_SUCCESS = 'FETCH_REPOS_LIST_SUCCESS'
export const FETCH_REPOS_LIST_FAIL = 'FETCH_REPOS_LIST_FAIL'

// get languages for group menu
export const QUERY_LANGUAGES_LIST = 'QUERY_LANGUAGES_LIST'
export const QUERY_LANGUAGES_LIST_SUCCESS = 'QUERY_LANGUAGES_LIST_SUCCESS'
export const QUERY_LANGUAGES_LIST_FAIL = 'QUERY_LANGUAGES_LIST_FAIL'

// get categories for group menu
export const QUERY_CATEGORIES_LIST = 'QUERY_CATEGORIES_LIST'
export const QUERY_CATEGORIES_LIST_SUCCESS = 'QUERY_CATEGORIES_LIST_SUCCESS'
export const QUERY_CATEGORIES_LIST_FAIL = 'QUERY_CATEGORIES_LIST_FAIL'

// search/order/filter/group
export const UPDATE_SEARCH_CONDITION = 'UPDATE_SEARCH_CONDITION'
export const UPDATE_ORDER_CONDITION = 'UPDATE_ORDER_CONDITION'
export const UPDATE_FILTER_CONDITION = 'UPDATE_FILTER_CONDITION'
export const UPDATE_GROUP_CONDITION = 'UPDATE_GROUP_CONDITION'

// get repos for repos list
export const QUERY_REPOS_LIST = 'QUERY_REPOS_LIST'
export const QUERY_REPOS_LIST_SUCCESS = 'QUERY_REPOS_LIST_SUCCESS'
export const QUERY_REPOS_LIST_FAIL = 'QUERY_REPOS_LIST_FAIL'

// search field
export const SEARCH_FIELD_ALL = 'SEARCH_FIELD_ALL'
export const SEARCH_FIELD_REPO_NAME = 'SEARCH_FIELD_REPO_NAME'
export const SEARCH_FIELD_REPO_DESCRIPTION = 'SEARCH_FIELD_REPO_DESCRIPTION'
export const SEARCH_FIELD_REPO_REMARK = 'SEARCH_FIELD_REPO_REMARK'

// filter types
export const FILTER_TYPE_NONE = 'FILTER_TYPE_NONE'
export const FILTER_TYPE_FLAG = 'FILTER_TYPE_FLAG'
export const FILTER_TYPE_REMAKR = 'FILTER_TYPE_REMAKR'
export const FILTER_TYPE_UNREAD = 'FILTER_TYPE_UNREAD'

// order types
export const ORDER_BY_DEFAULT = 'indexedDefaultOrder' // TODO change to starred time, need change github api npm package
export const ORDER_BY_STARS_COUNT = 'indexedStars'
export const ORDER_BY_FORKS_COUNT = 'indexedForks'
export const ORDER_BY_WATCHERS_COUNT = 'indexedWatchers'
export const ORDER_BY_OPEN_ISSUES_COUNT = 'indexedOpenIssues'
export const ORDER_BY_SIZE = 'indexedSize'
export const ORDER_BY_CREATE_TIME = 'indexedCreatedTime'
export const ORDER_BY_UPDATE_TIME = 'indexedUpdatedTime'
export const ORDER_BY_PUSH_TIME = 'indexedPushedTime'
export const ORDER_BY_SCORE = 'indexedScore'

export const ORDER_DESC = 'ORDER_DESC'
export const ORDER_ASC = 'ORDER_ASC'

// group types
export const GROUP_TYPE_CATEGORY = 'GROUP_TYPE_CATEGORY'
export const GROUP_TYPE_LANGUAGE = 'GROUP_TYPE_LANGUAGE'
export const GROUP_TYPE_UNKNOWN = 'GROUP_TYPE_UNKNOWN' // repos who do not have a custom category
export const GROUP_TYPE_ALL = 'GROUP_TYPE_ALL' // means removing category filter

// query profile
export const QUERY_MY_PROFILE = 'QUERY_MY_PROFILE'
export const QUERY_MY_PROFILE_SUCCESS = 'QUERY_MY_PROFILE_SUCCESS'
export const QUERY_MY_PROFILE_FAIL = 'QUERY_MY_PROFILE_FAIL'

// add a custom category
export const ADD_CUSTOM_CATEGORY = 'ADD_CUSTOM_CATEGORY'
export const ADD_CUSTOM_CATEGORY_SUCCESS = 'ADD_CUSTOM_CATEGORY_SUCCESS'
export const ADD_CUSTOM_CATEGORY_FAIL = 'ADD_CUSTOM_CATEGORY_FAIL'

// delete a custom category
export const DELETE_CUSTOM_CATEGORY = 'DELETE_CUSTOM_CATEGORY'
export const DELETE_CUSTOM_CATEGORY_SUCCESS = 'DELETE_CUSTOM_CATEGORY_SUCCESS'
export const DELETE_CUSTOM_CATEGORY_FAIL = 'DELETE_CUSTOM_CATEGORY_FAIL'

// attach a category to a repo
export const ATTACH_CUSTOM_CATEGORY = 'ATTACH_CUSTOM_CATEGORY'
export const ATTACH_CUSTOM_CATEGORY_SUCCESS = 'ATTACH_CUSTOM_CATEGORY_SUCCESS'
export const ATTACH_CUSTOM_CATEGORY_FAIL = 'ATTACH_CUSTOM_CATEGORY_FAIL'

// detach a category on a repo
export const DETACH_CUSTOM_CATEGORY = 'DETACH_CUSTOM_CATEGORY'
export const DETACH_CUSTOM_CATEGORY_SUCCESS = 'DETACH_CUSTOM_CATEGORY_SUCCESS'
export const DETACH_CUSTOM_CATEGORY_FAIL = 'DETACH_CUSTOM_CATEGORY_FAIL'
