import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { fetchTasksInit, authInit, openModalTaskInit, authLogoutInit } from 'Redux/actions';
import TaskList from 'AppComponents/TaskList';
import Loader from 'AppComponents/Loader';
import Pagination from 'AppComponents/Pagination';
import SortForm from 'AppComponents/SortForm';
import ModalTask from 'AppComponents/ModalTask';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './Home.module.scss';

class Home extends Component {
  state = {
    initialPage: 1,
    sortedBy: 'id',
  };

  componentDidMount() {
    const { history } = this.props;
    this.props.authInit(history);
    this.fetchTasksData();
  }

  fetchTasksData = (pageNum = 1, sortedBy = 'id') => {
    this.props.fetchTasksInit(pageNum, sortedBy)
      .then()
      .catch();
  };

  handleSortFormChange = sortedBy => {
    this.setState(() => {
      return {
        initialPage: 1,
        sortedBy,
      };
    });
    this.fetchTasksData(1, sortedBy);
  };

  onPageChange = ({ selected }) => {
    const { initialPage, sortedBy } = this.state;
    const page = selected + 1;
    if (page !== initialPage) {
      this.setState(prevState => {
        return {
          ...prevState,
          initialPage: page,
        };
      });

      this.fetchTasksData(page, sortedBy);
    }
  };

  handleLogout = () => {
    const { history } = this.props;
    this.props.authLogoutInit(history);
  };

  handleOpenModalTask = id => {
    const { tasks } = this.props;
    const task = tasks.filter(el => el.id === id)[0];
    this.props.openModalTaskInit(task);
  };

  render() {
    const { tasks, maxPages, loading, isAuthenticated } = this.props;
    const { initialPage, sortedBy } = this.state;
    return (
      <Fragment>
        <Helmet>
          <title>Главная страница</title>
          <meta name="description" content="Главная страница" />
        </Helmet>

        <div className={styles.Home}>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className={styles.Home__top}>
                {isAuthenticated ? (
                  <button onClick={() => this.handleLogout()}>Logout</button>
                ) : (
                  <Link to="/login">Enter as Admin</Link>
                )}
                <Link to="/tasks/create">Create new task</Link>
                <SortForm handleSortFormChange={this.handleSortFormChange} sortedBy={sortedBy} />
              </div>
              <TaskList
                tasks={tasks}
                isAuthenticated={isAuthenticated}
                handleOpenModalTask={this.handleOpenModalTask}
              />
              {maxPages && maxPages > 1 ? (
                <Pagination
                  pageCount={maxPages}
                  initialPage={initialPage - 1}
                  onPageChange={this.onPageChange}
                />
              ) : null}
            </Fragment>
          )}
          <ModalTask />
        </div>
      </Fragment>
    );
  }
}

Home.propTypes = {
  fetchTasksInit: PropTypes.func.isRequired,
  maxPages: PropTypes.number,
  tasks: PropTypes.array.isRequired,
  authInit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  openModalTaskInit: PropTypes.func.isRequired,
  authLogoutInit: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    tasks: state.tasks.tasks,
    maxPages: state.tasks.maxPages,
    loading: state.tasks.loading,
    isAuthenticated: state.auth.isAuthenticated
  };
};

function loadData(store) {
  return store
    .dispatch(fetchTasksInit())
    .then()
    .catch();
}

export default {
  loadData,
  component: connect(
    mapStateToProps,
    { fetchTasksInit, authInit, openModalTaskInit, authLogoutInit },
  )(withStyles(styles)(Home)),
};
