import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './Task.module.scss';

const Task = ({ id, email, text, status, username, isAuthenticated, handleOpenModalTask }) => {
  return (
    <li className={styles.Task}>
      <strong>{username}</strong>
      <p>{text}</p>
      <span>Email: {email}</span>
      <span>Status: {status ? 'Complete' : 'Pending'}</span>
      {isAuthenticated ? (
        <button type="button" onClick={() => handleOpenModalTask(id)}>
          Edit
        </button>
      ) : null}
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleOpenModalTask: PropTypes.func.isRequired,
};

export default withStyles(styles)(Task);
