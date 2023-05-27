import React from 'react';
import PropTypes from 'prop-types';
import {Plus} from 'react-feather';
import {Button, Gap} from 'tyylisivu-components';

const CreateButton = ({onClick, disabled, text}) => {
    return (
        <Button
            onClick={(e) => onClick(e)}
            disabled={disabled}
        >
            <Plus />
            <Gap />
            <span>{text}</span>
        </Button>
    );
};

CreateButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    text: PropTypes.string,
};

CreateButton.defaultProps = {
    onClick: () => {},
    disabled: false,
    text: 'Create',
};

export default CreateButton;
