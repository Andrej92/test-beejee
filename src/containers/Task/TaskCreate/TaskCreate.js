import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createTaskInit } from 'Redux/actions';
import { Form, Field } from 'react-final-form';
import { composeValidators, required, isEmail, isObject } from 'Utils/helpers';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './TaskCreate.module.scss';

class TaskCreate extends Component {
  onSubmit = taskData => {
    const { history } = this.props;
    this.props.createTaskInit(taskData, history);
  };

  renderErrors = error => {
    if (isObject(error)) {
      return Object.keys(error).map(el => {
        return (
          <p key={el} className={styles.Error}>
            {error[el]}
          </p>
        );
      });
    }

    return <p className={styles.Error}>{error}</p>;
  };

  render() {
    const { error } = this.props;

    return (
      <div className={styles.TaskCreate}>
        <Helmet>
          <title>Task create page</title>
          <meta name="description" content="Task create page" />
        </Helmet>

        <div className={styles.TaskCreate__form}>
          <strong>Create task</strong>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, submitting, submitSucceeded, form, pristine, valid }) => (
              <form onSubmit={handleSubmit}>
                <Field name="username" validate={composeValidators(required)}>
                  {({ input, meta }) => (
                    <div>
                      <input {...input} placeholder="Username" type="text" />
                      {meta.error && meta.touched && <p className={styles.Error}>{meta.error}</p>}
                    </div>
                  )}
                </Field>

                <Field name="email" validate={composeValidators(required, isEmail)}>
                  {({ input, meta }) => (
                    <div>
                      <input {...input} placeholder="Email" type="text" />
                      {meta.error && meta.touched && <p className={styles.Error}>{meta.error}</p>}
                    </div>
                  )}
                </Field>

                <Field name="text" validate={composeValidators(required, isEmail)}>
                  {({ input, meta }) => (
                    <div>
                      <textarea {...input} placeholder="Text" />
                      {meta.error && meta.touched && <p className={styles.Error}>{meta.error}</p>}
                    </div>
                  )}
                </Field>

                {error && submitSucceeded ? this.renderErrors(error) : null}

                <button type="button" disabled={submitting || pristine || !valid} onClick={ form.submit }>
                  Create
                </button>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

TaskCreate.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  createTaskInit: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    error: state.tasks.error,
  };
};

export default {
  component: connect(
    mapStateToProps,
    { createTaskInit },
  )(withStyles(styles)(TaskCreate)),
};
