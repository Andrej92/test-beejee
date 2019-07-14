import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import createStore from './utils/createStore';
import renderer from 'test-beejee/src/utils/renderer';
import Routes from './routes';
import rootSagas from 'test-beejee/src/redux/sagas';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);
  store.runSaga(rootSagas);

  try {
    const promises = matchRoutes(Routes, req.path)
      .map(({ route }) => {
        if (route.loadData) {
          return route.loadData(store, req.path);
        }
        return null;
      })
      .map(promiseData => {
        if (promiseData) {
          return Promise.all(promiseData);
        }
        return null;
      });

    const render = () => {
      const context = {};
      const content = renderer(req, store, context);

      if (context.notFound) {
        res.status(404);
      }

      store.close();
      res.send(content);
    };

    Promise.all(promises)
      .then(render)
      .catch(render);
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(3000, () => {
  console.log('listing on 3000');
});
