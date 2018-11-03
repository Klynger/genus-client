import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger'); // eslint-disable-line
  middlewares.push(logger);
}

middlewares.push(thunk);

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
