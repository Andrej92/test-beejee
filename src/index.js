import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { renderRoutes } from 'react-router-config';
import { composeWithDevTools } from 'redux-devtools-extension';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import createSagaMiddleware from 'redux-saga';
import createReduxWaitForMiddleware from 'redux-wait-for-action';
import rootSagas from 'test-beejee/src/redux/sagas';
import reducers from 'test-beejee/src/redux/reducers';
import Routes from './routes';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store with data from server side
const store = createStore(
  reducers,
  window.INITIAL_STATE,
  composeWithDevTools(applyMiddleware(sagaMiddleware, createReduxWaitForMiddleware())),
);

// Run sagas
sagaMiddleware.run(rootSagas);

// Create style bundle
const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(style => style._insertCss());
  return () => removeCss.forEach(dispose => dispose());
};

// Hydrate react bundle
ReactDOM.hydrate(
  <Provider store={store}>
    <StyleContext.Provider value={{ insertCss }}>
      <BrowserRouter>{renderRoutes(Routes)}</BrowserRouter>
    </StyleContext.Provider>
  </Provider>,
  document.querySelector('#app'),
);
