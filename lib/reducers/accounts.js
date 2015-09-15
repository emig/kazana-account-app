import createReducer from '../utils/create-reducer'
import {
  GET_ACCOUNTS,
  GET_ACCOUNT,
  CREATE_ACCOUNT,
  REQUEST_ACCOUNTS,
  REQUEST_ACCOUNT,
  RECEIVED_ACCOUNTS,
  RECEIVED_ACCOUNT
} from '../constants'

const initialState = {
  isLoading: false,
  didInvalidate: false,
  items: []
}

const actionHandlers = {
  [GET_ACCOUNTS]: (state, action) => {
    return action.accounts
  },
  [GET_ACCOUNT]: (state, action) => {
    return action.account
  },
  [CREATE_ACCOUNT]: (state, action) => {
    return state
  },
  [REQUEST_ACCOUNTS]: (state = initialState, action) => {
    return Object.assign({}, state, {
      didInvalidate: true,
      isLoading: true
    })
  },
  [REQUEST_ACCOUNT]: (state = initialState, action) => {
    return Object.assign({}, state, {
      didInvalidate: true,
      isLoading: true
    })
  },
  [RECEIVED_ACCOUNTS]: (state = initialState, action) => {
    return Object.assign({}, state, {
      isLoading: false,
      didInvalidate: false,
      items: action.accounts
    })
  },
  [RECEIVED_ACCOUNT]: (state = initialState, action) => {
    return Object.assign({}, state, {
      isLoading: false,
      didInvalidate: false,
      account: action.account
    })
  }
}

export default createReducer(initialState, actionHandlers)
