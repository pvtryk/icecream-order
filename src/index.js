import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Router } from 'react-router-dom';
import history from './history';

// reducers
import authReducer from './store/reducers/auth';
import icecreamsReducer from './store/reducers/icecreams';
import orderReducer from './store/reducers/order';
// sagas
import { watchAuth, watchIcecreams, watchOrder } from './store/sagas';

// components/containers
import App from './App';

// styles
import './styles/reset.scss';
import './styles/reusable.scss';
import './styles/base.scss';

const sagaMiddleware = createSagaMiddleware();

const mainReducer = combineReducers({
  auth: authReducer,
  ic: icecreamsReducer,
  order: orderReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  mainReducer,
  composeEnhancers( applyMiddleware( sagaMiddleware ) )
);

// INIT REDUX-SAGA
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchIcecreams);
sagaMiddleware.run(watchOrder);

const appIndex = (
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
)

ReactDOM.render(appIndex, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
