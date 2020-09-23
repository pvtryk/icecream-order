import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';

// import reducer from './store/reducer';
import icecreamsReducer from './store/reducers/icecreams';
import orderReducer from './store/reducers/order';

import App from './App';

import './styles/reset.scss';
import './styles/reusable.scss';
import './styles/bootstrap.scss';
import './styles/base.scss';

// const store = createStore(reducer);

const logger = (store) => {
  return (next) => {
    return (action) => {
      // console.log('[Middleware] Dispatching', action);
      const result = next(action);
      // console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

const mainReducer = combineReducers({
  ic: icecreamsReducer,
  order: orderReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

const appIndex = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(appIndex, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
