'use strict';
import 'babel-polyfill';

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory, Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from './reducers';

// import CSS
import './entry.scss';

// Components
import Game from './components/game/game';

// Middleware
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  createLogger(),
)(createStore);

const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} >
      <Route path='/' component={Game} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
