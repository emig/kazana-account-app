import Account from '../vendor/account'
import {
  CREATE_ACCOUNT,
  REQUEST_ACCOUNTS,
  REQUEST_ACCOUNT,
  RECEIVED_ACCOUNTS,
  RECEIVED_ACCOUNT,
  SAVE_ACCOUNT,
  ACCOUNT_SAVED,
  SHOW_ACCOUNTS
} from '../constants'

let accountsService = new Account()

export function addAccount (options) {
  return dispatch => {
    setTimeout(() => {
      const accountId = Math.random().toString(36).substring(7)
      dispatch({
        type: CREATE_ACCOUNT,
        account: {
          id: accountId,
          name: 'User ' + accountId
        }
      })
    })
  }
}

export function getAccounts (options) {
  return dispatch => {
    dispatch(requestAccounts())
    return accountsService.getAccounts()
    .then((accounts) => dispatch(receiveAccounts(accounts)))
  }
}

export function getAccount (accountId) {
  return dispatch => {
    dispatch(requestAccount())
    return accountsService.get(accountId)
    .then((account) => dispatch(receiveAccount(account)))
  }
}

export function showAccount (accountId) {
  return dispatch => {
    return dispatch(getAccount(accountId))
  }
}

function receiveAccounts (accounts) {
  return {
    type: RECEIVED_ACCOUNTS,
    accounts: accounts,
    receivedAt: Date.now()
  }
}

function receiveAccount (account) {
  return {
    type: RECEIVED_ACCOUNT,
    account: account,
    receivedAt: Date.now()
  }
}

function requestAccounts () {
  return {
    type: REQUEST_ACCOUNTS
  }
}

function requestAccount () {
  return {
    type: REQUEST_ACCOUNT
  }
}

function accountSaved (account) {
  return {
    type: ACCOUNT_SAVED,
    account: account
  }
}

function showAccounts () {
  return {
    type: SHOW_ACCOUNTS
  }
}

export function saveAccount (account) {
  return dispatch => {
    dispatch({
      type: SAVE_ACCOUNT,
      account: account
    })
    return accountsService.save(account)
      .then(account => dispatch(accountSaved()))
      .then(() => dispatch(showAccounts()))
  }
}
