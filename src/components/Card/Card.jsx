import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = ({children}) => {
    return (
        <div className={styles.card}>
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node,
};

Card.defaultProps = {
    children: undefined,
};

export default Card;
