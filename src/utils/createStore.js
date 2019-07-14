import { applyMiddleware, createStore } from 'redux';
import reducers from 'Redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createReduxWaitForMiddleware from 'redux-wait-for-action';
import createSagaMiddleware, { END } from 'redux-saga';

const createStoreData = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers, {}, composeWithDevTools(
      applyMiddleware(sagaMiddleware, createReduxWaitForMiddleware())),
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default createStoreData;
