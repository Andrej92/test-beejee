import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './App.module.scss';

const App = ({ route }) => {
  return <div className={styles.App}>{renderRoutes(route.routes)}</div>;
};

App.propTypes = {
  route: PropTypes.object,
};

export default {
  component: withStyles(styles)(App),
};
