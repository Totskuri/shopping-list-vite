import React from 'react';
import PropTypes from 'prop-types';
import styles from './TitleBar.module.scss';
import {Link} from 'react-router-dom';
import {ChevronLeft} from 'react-feather';
import '@szhsin/react-menu/dist/core.css';

const TitleBar = ({children, backUrl}) => {
    return (
        <div className={styles.bar}>
            <Link
                to={backUrl}
                className={styles.back}
            >
                <ChevronLeft />
            </Link>
            {children}
        </div>
    );
};

TitleBar.propTypes = {
    children: PropTypes.node,
    backUrl: PropTypes.string,
};

TitleBar.defaultProps = {
    children: undefined,
    backUrl: '',
};

export default TitleBar;
