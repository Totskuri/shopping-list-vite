import React from 'react';
import DefaultLayout from './DefaultLayout.jsx';
import Padding from '../components/Padding/Padding.jsx';
import PropTypes from 'prop-types';
import useTranslation from '../hooks/useTranslation.jsx';

const InternalError = ({text}) => {
    const t = useTranslation();
    return (
        <DefaultLayout>
            <Padding>
                <p>{t(text)}</p>
            </Padding>
        </DefaultLayout>
    );
};

InternalError.propTypes = {
    text: PropTypes.string,
};

InternalError.defaultProps = {
    text: 'Internal error',
};

export default InternalError;
