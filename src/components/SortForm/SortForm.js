import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'Utils/helpers';
import composeClasses from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './SortForm.module.scss';

const SortForm = ({ sortedBy, handleSortFormChange }) => {
  const selectValues = {
    email: 'Email',
    username: 'Username',
    status: 'Status',
  };

  const [selectOpen, setSelectOpen] = React.useState(false);

  const handleSelectClose = () => {
    setSelectOpen(false);
  };
  const handleSelectChange = key => {
    handleSortFormChange(key);
    handleSelectClose();
  };
  const handleSelectToggle = () => {
    setSelectOpen(!selectOpen);
  };

  return (
    <div className={styles.SortForm}>
      Sorted by:
      <div className={styles.SortForm__select}>
        <div className={styles.SortForm__header} onClick={() => handleSelectToggle()}>
          {sortedBy}
        </div>
        {selectOpen ? (
          <div className={styles.SortForm__list}>
            {!isEmpty(selectValues) && Object.keys(selectValues).map((key, index) => {
              const active = selectValues[key] === sortedBy ? styles.SortForm__item_active : null;
              return (
                <div
                  key={index}
                  onClick={() => handleSelectChange(selectValues[key])}
                  className={composeClasses(active, styles.SortForm__item)}
                >
                {key}
              </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

SortForm.propTypes = {
  sortedBy: PropTypes.string.isRequired,
  handleSortFormChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(SortForm);
