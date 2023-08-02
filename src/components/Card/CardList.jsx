import React from 'react';
import PropTypes from 'prop-types';
import Padding from '../Padding/Padding';
import styles from './CardList.module.scss';
import {Flipper} from "react-flip-toolkit";

const CardList = ({children, flipKey}) => {
    return (
        <div className={styles.list}>
            <Padding>
                <Flipper flipKey={flipKey}>
                    {children}
                </Flipper>
            </Padding>
        </div>
    );
};

CardList.propTypes = {
    children: PropTypes.node,
    flipKey: PropTypes.string,
};

CardList.defaultProps = {
    children: undefined,
    flipKey: '',
};

export default CardList;
