import React from 'react';
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
import ToastUtil from '../../utils/ToastUtil';
import {Container} from "tyylisivu-components";

const DefaultLayout = ({children, center}) => {
    return (
        <Container className={center ? styles.centerLayout : styles.defaultLayout}>
            {children}
            {ToastUtil.getToaster()}
        </Container>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    center: PropTypes.bool,
};

DefaultLayout.defaultProps = {
    center: false,
};

export default DefaultLayout;
