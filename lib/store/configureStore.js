/* global __DEVTOOLS__ */
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from '../middleware/logger'
import persistenceStore from '../persistence/store'
import * as reducers from '../reducers'
import { reduxReactRouter, routerStateReducer } from 'redux-react-router'

export default function configureStore (options) {
  let combinedCreateStore
  const storeEnhancers = [persistenceStore, reduxReactRouter({
    ...options.storeEnhancers
  })]

  if (__DEVTOOLS__) {
    const { devTools } = require('redux-devtools')
    storeEnhancers.push(devTools())
  }
  combinedCreateStore = compose(...storeEnhancers)(createStore)
  const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore)
  const combinedReducer = combineReducers({
    router: routerStateReducer,
    ...reducers
  })
  const store = finalCreateStore(combinedReducer, options.initialState)
  return store
}
