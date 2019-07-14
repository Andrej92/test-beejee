import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import withStyles from 'isomorphic-style-loader/withStyles';
import composeClasses from 'classnames';
import styles from './Pagination.module.scss';

const Pagination = ({ pageCount, initialPage, onPageChange }) => {
  return (
    <div className={styles.Pagination}>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        initialPage={initialPage}
        onPageChange={onPageChange}
        breakClassName={styles.Pagination__break}
        previousClassName={styles.Pagination__previous}
        previousLinkClassName={styles.Pagination__link}
        nextClassName={styles.Pagination__next}
        nextLinkClassName={styles.Pagination__link}
        containerClassName={styles.Pagination__list}
        pageClassName={styles.Pagination__item}
        pageLinkClassName={styles.Pagination__link}
        activeLinkClassName={composeClasses(
          styles.Pagination__link,
          styles.Pagination__link_active,
        )}
      />
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  initialPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Pagination);