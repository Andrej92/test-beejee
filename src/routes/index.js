import React from 'react';
import App from '../App';
import Home from 'AppContainers/Home';
import Login from 'AppContainers/Login';
import Error from 'AppContainers/Error';
import TaskCreate from 'AppContainers/Task/TaskCreate';

export default [
  {
    ...App,
    path: '/',
    routes: [
      {
        ...Home,
        path: '/',
        exact: true,
      },
      {
        ...TaskCreate,
        path: '/tasks/create',
        exact: true,
      },
      {
        ...Login,
        path: '/login',
        exact: true,
      },
      {
        ...Error,
      },
    ],
  },
];
