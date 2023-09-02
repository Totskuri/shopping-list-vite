import React from 'react';
import PropTypes from 'prop-types';
import {Drawer, Gap} from 'tyylisivu-components';
import styles from './EditDrawer.module.scss';
import CancelButton from '../Button/CancelButton.jsx';
import ConfirmButton from '../Button/ConfirmButton.jsx';

const EditDrawer = ({isOpen, handleClose, handleSave, children, isLoading}) => {
    return (
        <Drawer
            className={styles.drawer}
            isOpen={isOpen}
            handleClose={handleClose}
            position="bottom"
        >
            <div
                className={styles.body}
            >
                <div
                    className={styles.content}
                >
                    {children}
                </div>
                <div
                    className={styles.actions}
                >
                    <CancelButton onClick={handleClose} />
                    <Gap width={20} />
                    <ConfirmButton
                        onClick={handleSave}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </Drawer>
    );
};

EditDrawer.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
};

EditDrawer.defaultProps = {
    isOpen: false,
    isLoading: false,
};

export default EditDrawer;
