import React from 'react';
import DefaultLayout from './DefaultLayout.jsx';
import Padding from '../components/Padding/Padding.jsx';
import PropTypes from 'prop-types';
import useTranslation from '../hooks/useTranslation.jsx';

const NotFound = ({text}) => {
    const t = useTranslation();
    return (
        <DefaultLayout>
            <Padding>
                <p>{t(text)}</p>
            </Padding>
        </DefaultLayout>
    );
};

NotFound.propTypes = {
    text: PropTypes.string,
};

NotFound.defaultProps = {
    text: 'Not found',
};

export default NotFound;
