import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import Routes from '../routes';

export default (req, store, context) => {
  const css = new Set();
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
  const content = renderToString(
    <Provider store={store}>
      <StyleContext.Provider value={{ insertCss }}>
        <StaticRouter location={req.path} context={context}>
          {renderRoutes(Routes)}
        </StaticRouter>
      </StyleContext.Provider>
    </Provider>,
  );

  const helmet = Helmet.renderStatic();

  return `<html style="font-size: 10px;" lang="ru">
     <head>
        <base href="/" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">${[...css].join('')}</style>
      </head>
      <body>
        <div id="app">${content}</div>
        <div id="portal"></div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(store.getState())};
        </script>
      <script src="client.js" type="text/javascript"></script>
      </body>
    </html>
  `;
};
