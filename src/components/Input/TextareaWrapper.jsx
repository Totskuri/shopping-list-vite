import React from 'react';
import PropTypes from 'prop-types';
import {Textarea} from 'tyylisivu-components';
import styles from './Input.module.scss';

const TextareaWrapper = ({placeholder, value, onChange, autoFocus, onSubmit}) => {
    return (
        <Textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            className={styles.input}
            onSubmit={onSubmit}
        />
    );
};

TextareaWrapper.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    onSubmit: PropTypes.func,
};

TextareaWrapper.defaultProps = {
    placeholder: '',
    value: '',
    autoFocus: false,
    onSubmit: () => {},
};

export default TextareaWrapper;
