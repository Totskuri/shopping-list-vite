import React from 'react';
import PropTypes from 'prop-types';
import {NumberInput} from 'tyylisivu-components';
import styles from './Input.module.scss';

const NumberInputWrapper = ({value, onChange, readOnly, autoFocus, min, max}) => {

    return (
        <NumberInput
            className={styles.input}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            autoFocus={autoFocus}
            min={min}
            max={max}
        />
    );
};

NumberInputWrapper.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    autoFocus: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
};

NumberInputWrapper.defaultProps = {
    value: 0,
    readOnly: false,
    autoFocus: false,
    min: 0,
    max: 32767,
};

export default NumberInputWrapper;
