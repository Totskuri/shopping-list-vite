import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from "tyylisivu-components";
import Routes from "../../constants/routes.js";
import {Link} from "react-router-dom";

const TitleInput = ({value, isEditMode, onChange, to, autoFocus}) => {
    if (isEditMode) {
        return (
            <TextInput
                placeholder="Enter title"
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
            />
        );
    }

    if (to) {
        return (
            <Link to={to}>
                {value}
            </Link>
        );
    }

    return (
        <span>
            {value}
        </span>
    );
};

TitleInput.propTypes = {
    value: PropTypes.string,
    isEditMode: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    to: PropTypes.string,
    autoFocus: PropTypes.bool,
};

TitleInput.defaultProps = {
    value: '',
    isEditMode: true,
    to: '',
    autoFocus: false,
};

export default TitleInput;
