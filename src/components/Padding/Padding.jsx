import React from 'react';
import PropTypes from 'prop-types';
import styles from './Padding.module.scss';

const Padding = ({children}) => {
    return (
        <div className={styles.padding}>
            {children}
        </div>
    );
};

Padding.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Padding;
