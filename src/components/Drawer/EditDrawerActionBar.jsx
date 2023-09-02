import React from 'react';
import PropTypes from 'prop-types';
import {Gap} from 'tyylisivu-components';
import styles from './EditDrawerActionBar.module.scss';
import CancelButton from '../Button/CancelButton.jsx';
import ConfirmButton from '../Button/ConfirmButton.jsx';

const EditDrawerActionBar = ({innerRef, handleClose, handleSave, isLoading}) => {
    return (
        <div
            ref={innerRef}
            className={styles.actions}
        >
            <CancelButton onClick={handleClose} />
            <Gap width={20} />
            <ConfirmButton
                onClick={handleSave}
                isLoading={isLoading}
            />
        </div>
    );
};

EditDrawerActionBar.propTypes = {
    innerRef: PropTypes.shape({ current: PropTypes.any }),
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

EditDrawerActionBar.defaultProps = {
    isLoading: false,
};

export default EditDrawerActionBar;
