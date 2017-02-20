import * as Constant      from '../constants'

export const accounts = (state = [], action) => {
  switch (action.type) {
    case Constant.GET_LOCAL_CREDENTIALS:
      // TODO get token
      let token = ''
      return [...state, token];
    default:
      return state;
  }
}
