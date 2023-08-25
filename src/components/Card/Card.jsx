import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import {Flipped} from 'react-flip-toolkit';

const Card = ({children, flipId}) => {
    return (
        <Flipped flipId={flipId}>
            <div className={styles.card}>
                {children}
            </div>
        </Flipped>
    );
};

Card.propTypes = {
    children: PropTypes.node,
    flipId: PropTypes.string,
};

Card.defaultProps = {
    children: undefined,
    flipId: '',
};

export default Card;
