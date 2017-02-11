// sample reducer

import * as types from '../constants'
import assignToEmpty from '../utils/assign'

const initialState = {
  name: ''
}

export default function dataReducer (state = initialState, action) {
  Object.freeze(state) // 如果 state 是普通对象，永远不要修改它！比如，reducer 里不要使用 Object.assign(state, newData)，应该使用 Object.assign({}, state, newData)。这样才不会覆盖旧的 state
  switch (action.type) {
    case types.UPDATE_DATA:
      return assignToEmpty(state, {
        name: action.data.name
      })
    default:
      return state
  }
}
