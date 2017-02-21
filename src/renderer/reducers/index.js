import { combineReducers }          from 'redux'
import { routerReducer }            from 'react-router-redux'
import { accountsReducer }          from './accounts'

export default combineReducers({
  accounts: accountsReducer,
  routing: routerReducer
})
