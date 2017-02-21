import * as Constant      from '../constants'

export const getLocalCredentials = () => {
  return {
    type: Constant.GET_LOCAL_CREDENTIALS
  }
}

export const requestLogin = (credentials) => {
  return {
    type: Constant.REQUEST_LOGIN,
    credentials: credentials
  }
}
