import { applyMiddleware, compose, createStore } from 'redux'
import { reducers } from 'redux/reducers'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'

const epicMiddleware = createEpicMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(applyMiddleware(epicMiddleware)))

epicMiddleware.run(rootEpic)
