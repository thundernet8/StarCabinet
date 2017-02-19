import * as types         from '../constants'
import assignToEmpty      from '../utils/assign'

const initialState = {
  name: ''
}

export default function dataReducer (state = initialState, action) {
  Object.freeze(state)
  switch (action.type) {
    case types.UPDATE_DATA:
      return assignToEmpty(state, {
        name: action.data.name
      })
    default:
      return state
  }
}
