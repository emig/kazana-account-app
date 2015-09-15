import createReducer from '../utils/create-reducer'
import {
  SHOW_ACCOUNT,
  GET_ACCOUNT,
  CREATE_ACCOUNT,
  REQUEST_ACCOUNT,
  RECEIVED_ACCOUNT,
  SIGN_OUT,
  SAVE_ACCOUNT,
  ACCOUNT_SAVED
} from '../constants'

const initialState = {
  isLoading: false,
  didInvalidate: false,
  account: null
}

const actionHandlers = {
  [GET_ACCOUNT]: (state, action) => {
    return action.account
  },
  [SHOW_ACCOUNT]: (state, action) => {
    return action.account
  },
  [CREATE_ACCOUNT]: (state, action) => {
    return state
  },
  [REQUEST_ACCOUNT]: (state = initialState, action) => {
    return Object.assign({}, state, {
      didInvalidate: true,
      isLoading: true
    })
  },
  [RECEIVED_ACCOUNT]: (state = initialState, action) => {
    return Object.assign({}, state, {
      isLoading: false,
      didInvalidate: false,
      account: action.account
    })
  },
  [SAVE_ACCOUNT]: (state = initialState, action) => {
    return Object.assign({}, state, {
      isLoading: true,
      didInvalidate: false,
      account: action.account
    })
  },
  [ACCOUNT_SAVED]: (state = initialState, action) => {
    return Object.assign({}, state, {
      isLoading: false,
      didInvalidate: false,
      account: action.account
    })
  },
  [SIGN_OUT]: (state = initialState, action) => {
    return {}
  }
}

export default createReducer(initialState, actionHandlers)
