import * as CONSTANTS                from '../constants'
import Authentication                from '../utils/authentication'

export const getLocalCredentials = (successCb, needLogin = false) => {
  return (dispatch) => Authentication.getLocalCredentials((credentials) => {
    if (!!credentials && credentials.username && credentials.password) {
      dispatch({type: CONSTANTS.GET_LOCAL_CREDENTIALS_SUCCESS, credentials})

      if (needLogin) { // in login page we try auto-login after got the credentials
        Authentication.signInApp(credentials, (err, profile) => {
          !err && profile && typeof profile === 'object' ? dispatch({type: CONSTANTS.REQUEST_LOGIN_SUCCESS, profile, msg: '', callback: successCb})
          : dispatch({type: CONSTANTS.REQUEST_LOGIN_FAIL, profile: null, msg: err.message, callback: successCb})
        })
      } else {
        typeof successCb === 'function' && successCb(credentials)
      }
    } else {
      dispatch({type: CONSTANTS.GET_LOCAL_CREDENTIALS_FAIL, credentials})
    }
  })
}

export const requestLogin = (credentials, callback) => {
  return (dispatch) => Authentication.signInApp(credentials, (err, profile) => {
    !err && profile && typeof profile === 'object' ? dispatch({type: CONSTANTS.REQUEST_LOGIN_SUCCESS, profile, msg: '', callback})
    : dispatch({type: CONSTANTS.REQUEST_LOGIN_FAIL, profile: null, msg: err, callback})
  })
}
