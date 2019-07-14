import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './Loader.module.scss';

const Loader = () => <div className={styles.Loader}> </div>;

export default withStyles(styles)(Loader);
