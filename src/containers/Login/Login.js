import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { authLoginInit } from 'Redux/actions';
import { Form, Field } from 'react-final-form';
import { composeValidators, required, isObject } from 'Utils/helpers';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './Login.module.scss';

class Login extends Component {
  onSubmit = loginData => {
    const { history } = this.props;
    this.props.authLoginInit(loginData, history);
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
      <div className={styles.Login}>
        <Helmet>
          <title>Login page</title>
          <meta name="description" content="Login page" />
        </Helmet>

        <div className={styles.Login__form}>
          <strong>Authorization</strong>
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

                <Field name="password" validate={composeValidators(required)}>
                  {({ input, meta }) => (
                    <div>
                      <input {...input} placeholder="Password" type="password" />
                      {meta.error && meta.touched && <p className={styles.Error}>{meta.error}</p>}
                    </div>
                  )}
                </Field>

                {error && submitSucceeded ? this.renderErrors(error) : null}

                <button
                  type="button"
                  disabled={submitting || pristine || !valid}
                  onClick={form.submit}
                >
                  Login
                </button>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  authLoginInit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    authLoginInit: PropTypes.func.isRequired,
  };
};

export default {
  component: connect(
    mapStateToProps,
    { authLoginInit },
  )(withStyles(styles)(Login)),
};
