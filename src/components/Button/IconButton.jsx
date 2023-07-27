import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'tyylisivu-components';
import styles from './IconButton.module.scss';

const IconButton = ({children, onClick, disabled}) => {
    return (
        <Button
            onClick={(e) => onClick(e)}
            disabled={disabled}
            variant="textDark"
            className={styles.button}
        >
            {children}
        </Button>
    );
};

IconButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

IconButton.defaultProps = {
    onClick: () => {},
    disabled: false,
};

export default IconButton;
