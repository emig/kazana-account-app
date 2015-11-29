import * as constants from '../constants'

import accountAdmin from '../vendor/account'

export function signIn (form, history, nextPath) {
  return dispatch => {
    // simulate request
    accountAdmin.signIn({
      username: form.username,
      password: form.password
    })
    .then(function (account) {
      dispatch({
        type: constants.SIGNED_IN,
        payload: account
      })
      // redirect to a secure page
      history.pushState({}, nextPath)
    })
    .catch(function (error) {
      window.alert(error)
    })
  }
}

export function purgeCache () {
  return {
    type: constants.PURGE_CACHE
  }
}
