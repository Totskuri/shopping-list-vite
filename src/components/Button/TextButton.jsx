import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'tyylisivu-components';

const TextButton = ({children, onClick, disabled}) => {
    return (
        <Button
            onClick={(e) => onClick(e)}
            disabled={disabled}
            variant="textDark"
        >
            {children}
        </Button>
    );
};

TextButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

TextButton.defaultProps = {
    onClick: () => {},
    disabled: false,
};

export default TextButton;
