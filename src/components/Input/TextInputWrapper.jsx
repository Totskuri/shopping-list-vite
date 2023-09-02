import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'tyylisivu-components';
import styles from './Input.module.scss';

const TextInputWrapper = ({placeholder, value, onChange, autoFocus, onSubmit}) => {
    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            className={styles.input}
            onSubmit={onSubmit}
            enterKeyHint="done"
        />
    );
};

TextInputWrapper.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    onSubmit: PropTypes.func,
};

TextInputWrapper.defaultProps = {
    placeholder: '',
    value: '',
    autoFocus: false,
    onSubmit: () => {},
};

export default TextInputWrapper;
