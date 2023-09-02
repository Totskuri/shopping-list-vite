import React from 'react';
import PropTypes from 'prop-types';
import {Drawer} from 'tyylisivu-components';
import styles from './EditDrawer.module.scss';

const EditDrawer = ({isOpen, handleClose, children}) => {
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
                {children}
            </div>
        </Drawer>
    );
};

EditDrawer.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

EditDrawer.defaultProps = {
    isOpen: false,
};

export default EditDrawer;
