import { combineReducers }                                from 'redux'
import { routerReducer }                                  from 'react-router-redux'
import { credentialsReducer, loginResultReducer }         from './accounts'
import { offlineReducer }                                 from './network'
import { dbConnectReducer }                               from './db'
import {
    reposListReducer,
    fetchingReposStatusReducer
}                                                         from './repos'
import {
    searchConditionReducer,
    orderConditionReducer,
    groupConditionReducer,
    filterConditionReducer
}                                                         from './conditional'
import { profileReducer }                                 from './profile'
import { languagesReducer }                               from './languages'
import { categoriesReducer }                              from './categories'

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
    languages: languagesReducer,
    categories: categoriesReducer,
    fetchStatus: fetchingReposStatusReducer
})
