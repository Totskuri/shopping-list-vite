import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Check} from 'react-feather';
import {Button, Gap} from 'tyylisivu-components';
import Spinner from '../Spinner/Spinner';

const ConfirmButton = ({onClick, disabled, isLoading}) => {
    return (
        <Button
            onClick={(e) => onClick(e)}
            disabled={disabled}
        >
            {isLoading && (
                <Spinner />
            )}
            {!isLoading && (
                <Fragment>
                    <Check />
                    <Gap />
                    <span>Confirm</span>
                </Fragment>
            )}
        </Button>
    );
};

ConfirmButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
};

ConfirmButton.defaultProps = {
    onClick: () => {},
    disabled: false,
    isLoading: false,
};

export default ConfirmButton;
