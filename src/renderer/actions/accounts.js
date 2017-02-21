import * as Constant      from '../constants'

export const getLocalCredentials = () => {
  return {
    type: Constant.GET_LOCAL_CREDENTIALS
  }
}

export const clearLoginUsername = () => {
  return {
    type: Constant.CLEAR_LOGIN_USERNAME,
    username: ''
  }
}

export const clearLoginPassword = () => {
  return {
    type: Constant.CLEAR_LOGIN_PASSWORD,
    password: ''
  }
}

export const changeLoginUsername = (username) => {
  return {
    type: Constant.CHANGE_LOGIN_USERNAME,
    username: username
  }
}

export const changeLoginPassword = (password) => {
  return {
    type: Constant.CHANGE_LOGIN_PASSWORD,
    password: password
  }
}
