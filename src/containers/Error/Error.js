import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './Error.module.scss';

const Error = ({ staticContext = {} }) => {
  staticContext.notFound = true;

  return (
    <div className={styles.Error}>
      <Helmet>
        <title>Page not found</title>
        <meta name="description" content="Page not found" />
      </Helmet>

      <h1>Page not found</h1>
    </div>
  );
};

Error.propTypes = {
  staticContext: PropTypes.object,
};

export default {
  component: withStyles(styles)(Error),
};
