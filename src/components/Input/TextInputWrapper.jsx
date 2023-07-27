import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from "tyylisivu-components";
import styles from './Input.module.scss';

const TextInputWrapper = ({placeholder, value, onChange, autoFocus}) => {
    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            className={styles.input}
        />
    );
};

TextInputWrapper.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
};

TextInputWrapper.defaultProps = {
    placeholder: '',
    value: '',
    autoFocus: false,
};

export default TextInputWrapper;
