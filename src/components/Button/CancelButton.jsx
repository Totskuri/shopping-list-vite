import React from 'react';
import PropTypes from 'prop-types';
import {X} from 'react-feather';
import {Button, Gap} from 'tyylisivu-components';

const CancelButton = ({onClick, disabled}) => {
    return (
        <Button
            onClick={(e) => onClick(e)}
            disabled={disabled}
            style={{
                backgroundColor: 'white',
            }}
            variant="transparentDark"
        >
            <X />
            <Gap />
            <span>Cancel</span>
        </Button>
    );
};

CancelButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

CancelButton.defaultProps = {
    onClick: () => {},
    disabled: false,
};

export default CancelButton;
