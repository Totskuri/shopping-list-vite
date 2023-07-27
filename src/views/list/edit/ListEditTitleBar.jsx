import React from 'react';
import TitleBar from '../../../components/TitleBar/TitleBar';
import Routes from '../../../constants/routes';
import PropTypes from 'prop-types';
import styles from './ListEditTitleBar.module.scss';

const ListEditTitleBar = ({title}) => {
    return (
        <TitleBar
            backUrl={Routes.INDEX}
        >
            <h1 className={styles.title}>
                {title}
            </h1>
        </TitleBar>
    );
};

ListEditTitleBar.propTypes = {
    title: PropTypes.string,
};

ListEditTitleBar.defaultProps = {
    title: '',
};

export default ListEditTitleBar;
