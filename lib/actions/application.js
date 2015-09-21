import * as constants from '../constants'

import Account from '../vendor/account.js'
var account = new Account()

export function signIn (form, history, nextPath) {
  return dispatch => {
    // simulate request
    account.signIn()
    .then(function (session) {
      dispatch({
        type: constants.SIGNED_IN,
        payload: session
      })
      // redirect to a secure page
      history.pushState({}, nextPath)
    })
  }
}

export function purgeCache () {
  return {
    type: constants.PURGE_CACHE
  }
}
