import React from 'react';
import PropTypes from 'prop-types';
import Padding from '../Padding/Padding';
import styles from './CardList.module.scss';

const CardList = ({children}) => {
    return (
        <div className={styles.list}>
            <Padding>
                {children}
            </Padding>
        </div>
    );
};

CardList.propTypes = {
    children: PropTypes.node,
};

CardList.defaultProps = {
    children: undefined,
};

export default CardList;
