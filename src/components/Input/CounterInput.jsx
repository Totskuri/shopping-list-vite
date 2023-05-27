import React from 'react';
import PropTypes from 'prop-types';
import Flex from '../Flex/Flex';
import IconButton from '../Button/IconButton';
import {Minus, Plus} from 'react-feather';
import {NumberInput} from 'tyylisivu-components';

const CounterInput = ({value, onChange, readOnly, className, autoFocus, min, max, isEditMode}) => {
    const onSubtract = () => {
        const newValue = value - 1;
        if (newValue >= min) {
            onChange(newValue);
        }
    };

    const onAdd = () => {
        const newValue = value + 1;
        if (newValue <= max) {
            onChange(newValue);
        }
    };

    if (isEditMode) {
        return (
            <Flex>
                <IconButton
                    onClick={onSubtract}
                >
                    <Minus color="#dc3545" />
                </IconButton>
                <NumberInput
                    className={className}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    autoFocus={autoFocus}
                    min={min}
                    max={max}
                />
                <IconButton
                    onClick={onAdd}
                >
                    <Plus color="#28a745" />
                </IconButton>
            </Flex>
        );
    }

    return (
        <span>
            {value}
        </span>
    );
};

CounterInput.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    autoFocus: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    isEditMode: PropTypes.bool,
};

CounterInput.defaultProps = {
    value: 0,
    readOnly: false,
    className: '',
    autoFocus: false,
    min: 0,
    max: 32767,
    isEditMode: true,
};

export default CounterInput;
