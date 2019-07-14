import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { updateTaskInit, closeModalTaskInit } from 'Redux/actions';
import { Form, Field } from 'react-final-form';
import { composeValidators, required, isEmail, isObject, isEmpty } from 'Utils/helpers';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './ModalTask.module.scss';

class ModalTask extends Component {
  handleModalTaskClose = () => {
    this.props.closeModalTaskInit();
  };

  onSubmit = taskData => {
    this.props.updateTaskInit(taskData);
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
    const { error, isModalTaskOpen, task } = this.props;
    return (
      <React.Fragment>
        {isModalTaskOpen
          ? ReactDOM.createPortal(
            <div className={styles.ModalTask}>
              <div className={styles.ModalTask__form}>
                <strong>Create task</strong>
                <Form
                  onSubmit={this.onSubmit}
                  initialValues={{
                      ...task,
                    }}
                  render={({ handleSubmit, submitting, values, submitSucceeded, form, pristine, valid }) => (
                    <form onSubmit={handleSubmit}>
                      <p>{values && values.username}</p>
                      <p>{values && values.email}</p>

                      <Field name="text" validate={composeValidators(required, isEmail)}>
                        {({ input, meta }) => (
                          <div>
                            <textarea {...input} placeholder="Text" />
                            {meta.error && meta.touched && <p className={styles.Error}>{meta.error}</p>}
                          </div>
                        )}
                      </Field>

                      <Field name="status" type="checkbox">
                        {({ input, meta }) => (
                          <div>
                            <span>Статус: </span>
                            <input {...input} type="checkbox" />
                            {meta.error && meta.touched && <p className={styles.Error}>{meta.error}</p>}
                          </div>
                        )}
                      </Field>

                      {error && submitSucceeded ? this.renderErrors(error) : null}

                      <button type="button" disabled={submitting || pristine || !valid} onClick={ form.submit }>
                        Update
                      </button>
                      <button type="button" onClick={() => this.handleModalTaskClose()}>
                        Close
                      </button>

                    </form>
                  )}
                />
              </div>
            </div>,
            document.getElementById('portal'))
          : null}
      </React.Fragment>
    );
  }
}

ModalTask.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  updateTaskInit: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  isModalTaskOpen: PropTypes.bool.isRequired,
  closeModalTaskInit: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    error: state.tasks.error,
    task: state.modals.task,
    isModalTaskOpen: state.modals.isModalTaskOpen,
  };
};

export default connect(
  mapStateToProps,
  { updateTaskInit, closeModalTaskInit },
)(withStyles(styles)(ModalTask));
