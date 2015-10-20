/* global __DEVTOOLS__ */
import React from 'react'
import { Redirect, Route } from 'react-router'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-react-router'
import * as storage from './persistence/storage'
import * as containers from './containers'
import * as constants from './constants'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import createHashHistory from 'history/lib/createHashHistory'
import configureStore from './store/configureStore.js'
import requireAuth from './utils/require-auth'

// Use hash location for static build
// but switch to HTML5 history locally.
const history = process.env.NODE_ENV === 'production'
                ? createHashHistory()
                : createBrowserHistory()

// Configure Routes
const {
  Application,
  // Forbidden,
  SignIn,
  Dashboard,
  Account,
  Accounts
} = containers

const routes = (
    <Route component={Application}>
      <Route path='/' component={Dashboard} onEnter={requireAuth} />
      <Route path='accounts/new' component={Account} />
      <Route path='accounts/:accountId' component={Account} />
      <Route path='accounts' component={Accounts} onEnter={requireAuth} />
      <Route path='sign-in' component={SignIn} />
      <Route path='sign-out' onEnter={signOut} />
      <Redirect from='*' to='/' />
    </Route>
)

// Configure store
const initialState = {
  application: {
    session: JSON.parse(storage.get('session'))
  }
}

const store = configureStore({
  initialState,
  storeEnhancers: {
    routes,
    history
  }
})

function getRootChildren () {
  const rootChildren = [
    <Provider key='provider' store={store}>
      <ReduxRouter />
    </Provider>
  ]

  if (__DEVTOOLS__) {
    const { DevTools, DebugPanel, LogMonitor } =
      require('redux-devtools/lib/react')
    rootChildren.push(
      <div className='debug-panel'>
        <DebugPanel className='debug-panel' key='debug-panel' top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
  return rootChildren
}

export default class Root extends React.Component {

  render () {
    return (
      <div>{getRootChildren()}</div>
    )
  }
}

function signOut (nextState, replaceState) {
  store.dispatch({ type: constants.SIGN_OUT })
  replaceState({}, '/sign-in')
}

if (__DEVTOOLS__) {
  window.kazana = window.kazana || {}
  window.kazana = Object.assign({}, window.kazana, {
    toggleDevTools: function () {
      const el = document.querySelector('.debug-panel')
      if (el.style.display === 'none') {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  })
}
