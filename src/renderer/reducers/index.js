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
    categoryConditionReducer,
    filterConditionReducer
}                                                         from './conditional'
import { profileReducer }                                 from './profile'

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
    category: categoryConditionReducer,
    repos: reposListReducer,
    fetchStatus: fetchingReposStatusReducer
})
