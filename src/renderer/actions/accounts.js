import * as CONSTANTS                from '../constants'
import Authentication                from '../utils/authentication'

export const getLocalCredentials = (successCb) => {
  return (dispatch) => Authentication.getLocalCredentials((credentials) => {
    !!credentials && credentials.username
    ? (dispatch({type: CONSTANTS.GET_LOCAL_CREDENTIALS_SUCCESS, credentials}) &&
      typeof successCb === 'function' && // in login page, we need try login if get credentials successfully
      Authentication.signInApp(credentials, (err, profile) => {
        !err && profile && typeof profile === 'object' ? dispatch({type: CONSTANTS.REQUEST_LOGIN_SUCCESS, profile, msg: '', callback: successCb})
        : dispatch({type: CONSTANTS.REQUEST_LOGIN_FAIL, profile: null, msg: err.message, callback: successCb})
      }))
    : dispatch({type: CONSTANTS.GET_LOCAL_CREDENTIALS_FAIL, credentials})
  })
}

export const requestLogin = (credentials, callback) => {
  return (dispatch) => Authentication.signInApp(credentials, (err, profile) => {
    !err && profile && typeof profile === 'object' ? dispatch({type: CONSTANTS.REQUEST_LOGIN_SUCCESS, profile, msg: '', callback})
    : dispatch({type: CONSTANTS.REQUEST_LOGIN_FAIL, profile: null, msg: err, callback})
  })
}
