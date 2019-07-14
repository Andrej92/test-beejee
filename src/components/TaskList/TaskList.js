import React from 'react';
import PropTypes from 'prop-types';
import { isArrayNotEmpty } from 'Utils/helpers';
import withStyles from 'isomorphic-style-loader/withStyles';
import Task from '../Task';
import styles from './TaskList.module.scss';

const TaskList = ({ tasks, isAuthenticated, handleOpenModalTask }) => {
  return (
    <ul className={styles.TaskList}>
      {isArrayNotEmpty(tasks)
        ? tasks.map(task => {
          return (
            <Task
              key={task.id}
              id={task.id}
              text={task.text}
              email={task.email}
              username={task.username}
              status={task.status}
              isAuthenticated={isAuthenticated}
              handleOpenModalTask={handleOpenModalTask}
            />
          );
        })
        : null}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  handleOpenModalTask: PropTypes.func.isRequired,
};

export default withStyles(styles)(TaskList);
