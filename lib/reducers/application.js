import * as constants from '../constants'
import createReducer from '../utils/create-reducer'

const initialState = {
  session: null
}

const actionHandlers = {
  [constants.SIGNED_IN]: (_, action) => {
    return {
      session: action.payload
    }
  },
  [constants.SIGN_OUT]: () => {
    return {
      session: null,
      account: null,
      accounts: null
    }
  }
}

export default createReducer(initialState, actionHandlers)
