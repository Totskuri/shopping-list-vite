import React from 'react';
import PropTypes from 'prop-types';
import {Textarea} from 'tyylisivu-components';
import styles from './Input.module.scss';

const TextareaWrapper = ({placeholder, value, onChange, autoFocus, onSubmit, onFocus}) => {
    return (
        <Textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            className={styles.input}
            onSubmit={onSubmit}
            onFocus={onFocus}
        />
    );
};

TextareaWrapper.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    onSubmit: PropTypes.func,
    onFocus: PropTypes.func,
};

TextareaWrapper.defaultProps = {
    placeholder: '',
    value: '',
    autoFocus: false,
    onSubmit: () => {},
    onFocus: () => {},
};

export default TextareaWrapper;
