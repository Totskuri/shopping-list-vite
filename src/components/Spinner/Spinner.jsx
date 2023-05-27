import React from 'react';
import styles from './Spinner.module.scss';
import PropTypes from 'prop-types';

const Spinner = ({isDark}) => {
    return (
        <div className={`${styles.spinner} ${isDark ? styles.dark : ''}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

Spinner.propTypes = {
    isDark: PropTypes.bool,
};

Spinner.defaultProps = {
    isDark: false,
};

export default Spinner;
