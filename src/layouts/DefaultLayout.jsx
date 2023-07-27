import React from 'react';
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
import ToastUtil from '../utils/ToastUtil.jsx';

const DefaultLayout = ({children, center}) => {
    return (
        <div className={center ? styles.centerLayout : styles.defaultLayout}>
            {children}
            {ToastUtil.getToaster()}
        </div>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    center: PropTypes.bool,
};

DefaultLayout.defaultProps = {
    center: false,
};

export default DefaultLayout;
